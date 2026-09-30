'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

type HardwareTier = 'low' | 'medium' | 'high';

const isCoarsePointer = (): boolean =>
  window.matchMedia?.('(pointer: coarse)').matches ?? false;

// Phones are NOT automatically "low": modern phones are fast, and the real
// bottleneck here is fill rate, which adaptive resolution handles at runtime.
// Only genuinely weak hardware lands on the low tier.
const detectHardwareTier = (): HardwareTier => {
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  const cores = navigator.hardwareConcurrency;
  const isTouchOrSmall = window.innerWidth < 768 || isCoarsePointer();

  if ((memory !== undefined && memory < 4) || (cores !== undefined && cores <= 2)) {
    return 'low';
  } else if (isTouchOrSmall || (memory !== undefined && memory < 8) || (cores !== undefined && cores <= 4)) {
    return 'medium';
  }
  return 'high';
};

const TIER_CONFIG = {
  low: {
    gridSize: 24,
    sphereDetail: 4,
    antialias: false,
    maxPixelRatio: 1.5,
    animSpeed: 0.05,
    cameraSpeed: 0.0003,
    spikeProb: 0.15,
    dropProb: 0.25,
    mouseEnabled: false,
    maxFps: 30,
    powerPreference: 'low-power' as WebGLPowerPreference,
  },
  medium: {
    gridSize: 32,
    sphereDetail: 6,
    antialias: true,
    maxPixelRatio: 2,
    animSpeed: 0.08,
    cameraSpeed: 0.0006,
    spikeProb: 0.3,
    dropProb: 0.5,
    mouseEnabled: true,
    maxFps: 60,
    powerPreference: 'default' as WebGLPowerPreference,
  },
  high: {
    gridSize: 40,
    sphereDetail: 8,
    antialias: true,
    maxPixelRatio: 2,
    animSpeed: 0.12,
    cameraSpeed: 0.001,
    spikeProb: 0.5,
    dropProb: 0.9,
    mouseEnabled: true,
    maxFps: 60,
    powerPreference: 'high-performance' as WebGLPowerPreference,
  },
};

// Adaptive resolution: start at the sharpest ratio the tier allows and only step
// down if the device *demonstrably* can't keep up with its own fps target.
const SLOW_FACTOR = 1.6;     // avg frame time > target * this counts as slow
const ADAPT_WINDOW = 60;     // frames per measurement window
const WARMUP_FRAMES = 120;   // ignore startup hitches (hydration, asset loads)
const SLOW_WINDOWS_TO_STEP = 2; // consecutive slow windows before stepping down
const PIXEL_RATIO_STEP = 0.85;
const MIN_PIXEL_RATIO = 1;   // never go below native CSS pixels — avoids visible pixelation

// Base animation constants were tuned at 60fps; dt is normalised to that.
const REF_FRAME_MS = 1000 / 60;

// Global playback speed. 1 = speeds as written in TIER_CONFIG at 60fps.
const TIME_SCALE = 0.5;

// Vertex colours aren't colour-managed, so convert sRGB hex -> linear ourselves
// (matches what a material `color` would do).
const LINE_COLOR = new THREE.Color(0xeb6a1e);
const LINE_R = LINE_COLOR.r;
const LINE_G = LINE_COLOR.g;
const LINE_B = LINE_COLOR.b;

const DotNetworkBackground = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const tier = detectHardwareTier();
    const config = TIER_CONFIG[tier];
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const { gridSize } = config;
    const mouseEnabled = config.mouseEnabled && !isCoarsePointer();
    const spacing = 4;

    // Renderer — bail out gracefully if WebGL is unavailable (black bg remains)
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: config.antialias,
        alpha: true,
        powerPreference: config.powerPreference,
        stencil: false,
        depth: false, // no depth testing needed: dots are tiny, lines additive
      });
    } catch {
      return;
    }

    let pixelRatio = Math.min(window.devicePixelRatio || 1, config.maxPixelRatio);
    // Size from the container (100lvh = largest viewport), NOT window.innerHeight:
    // mobile address-bar show/hide changes innerHeight and would shift/re-size the scene.
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.7, 1200);
    camera.position.set(0, 10, 40);

    // ── Dots: one InstancedMesh, positions written directly into the buffer ──
    const dotCount = gridSize * gridSize;
    const dotGeometry = new THREE.SphereGeometry(0.08, config.sphereDetail, config.sphereDetail);
    const dotMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.4 });
    const instancedMesh = new THREE.InstancedMesh(dotGeometry, dotMaterial, dotCount);
    instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    instancedMesh.frustumCulled = false; // instances move; bounding sphere is stale
    scene.add(instancedMesh);
    const matrixArray = instancedMesh.instanceMatrix.array as Float32Array;

    // Struct-of-arrays: cache-friendly, no per-dot objects
    const dotX = new Float32Array(dotCount);
    const dotZ = new Float32Array(dotCount);
    const dotY = new Float32Array(dotCount);
    const dotDepth = new Float32Array(dotCount);
    const dotPhase = new Float32Array(dotCount);
    const dotAmp = new Float32Array(dotCount);
    const dotFreq = new Float32Array(dotCount);
    const spikeHeight = new Float32Array(dotCount);
    const dropDepth = new Float32Array(dotCount);
    // progress: 0 = idle; (0,1] = active
    const spikeProg = new Float32Array(dotCount);
    const dropProg = new Float32Array(dotCount);
    const spiking = new Uint8Array(dotCount);
    const dropping = new Uint8Array(dotCount);

    for (let z = 0; z < gridSize; z++) {
      for (let x = 0; x < gridSize; x++) {
        const i = z * gridSize + x;
        const xPos = (x - gridSize / 2) * spacing;
        const zPos = (z - gridSize / 2) * spacing;
        const s = 1 - (z / gridSize) * 0.5;

        dotX[i] = xPos;
        dotZ[i] = zPos;
        dotDepth[i] = z / gridSize;
        dotPhase[i] = Math.random() * Math.PI * 2;
        dotAmp[i] = 0.15 + Math.random() * 0.1;
        dotFreq[i] = 0.3 + Math.random() * 0.2;
        spikeHeight[i] = 3 + Math.random() * 2;
        dropDepth[i] = -(3 + Math.random());

        // Column-major 4x4: uniform scale + translation. Only [13] (y) changes per frame.
        const o = i * 16;
        matrixArray[o] = s;
        matrixArray[o + 5] = s;
        matrixArray[o + 10] = s;
        matrixArray[o + 12] = xPos;
        matrixArray[o + 13] = 0;
        matrixArray[o + 14] = zPos;
        matrixArray[o + 15] = 1;
      }
    }
    instancedMesh.instanceMatrix.needsUpdate = true;

    // ── Lines: ONE LineSegments draw call, per-vertex colour for fade ──
    const neighborOffsets: [number, number][] = [[1, 0], [0, 1], [1, 1], [-1, 1]];
    const pairA: number[] = [];
    const pairB: number[] = [];
    for (let i = 0; i < dotCount; i++) {
      const z = (i / gridSize) | 0;
      const x = i % gridSize;
      for (const [dx, dz] of neighborOffsets) {
        const nx = x + dx;
        const nz = z + dz;
        if (nx >= 0 && nx < gridSize && nz < gridSize) {
          pairA.push(i);
          pairB.push(nz * gridSize + nx);
        }
      }
    }
    const segCount = pairA.length;
    const lineA = Uint16Array.from(pairA);
    const lineB = Uint16Array.from(pairB);
    const connectDistance = spacing * 2;
    const lineMaxDist = new Float32Array(segCount);
    const lineMaxDistSq = new Float32Array(segCount);
    const lineFade = new Float32Array(segCount); // (1 - depth*0.5) * 0.8
    for (let k = 0; k < segCount; k++) {
      const depth = dotDepth[lineA[k]];
      lineMaxDist[k] = connectDistance * (1 - depth * 0.3);
      lineMaxDistSq[k] = lineMaxDist[k] * lineMaxDist[k];
      lineFade[k] = (1 - depth * 0.5) * 0.8;
    }

    const linePositions = new Float32Array(segCount * 6);
    const lineColors = new Float32Array(segCount * 6);
    const lineGeometry = new THREE.BufferGeometry();
    const posAttr = new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage);
    const colAttr = new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage);
    lineGeometry.setAttribute('position', posAttr);
    lineGeometry.setAttribute('color', colAttr);
    lineGeometry.setDrawRange(0, 0);
    // Additive blending: scaling colour toward black == lowering opacity
    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    lineSegments.frustumCulled = false;
    scene.add(lineSegments);

    // ── Cached objects ──
    const lookAtTarget = new THREE.Vector3(0, 0, 0);
    const raycaster = new THREE.Raycaster();
    const mousePlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const mouseIntersection = new THREE.Vector3();
    const mouse = new THREE.Vector2(0, 0);
    let mouseActive = false;

    const pickIdle = (): number => {
      // Bounded random probing — no per-call array allocation
      for (let t = 0; t < 6; t++) {
        const i = (Math.random() * dotCount) | 0;
        if (!spiking[i] && !dropping[i]) return i;
      }
      return -1;
    };
    const triggerSpike = (i: number) => { spiking[i] = 1; spikeProg[i] = 0; };
    const triggerDrop = (i: number) => { dropping[i] = 1; dropProg[i] = 0; };

    // ── Loop state ──
    let rafId = 0;
    let running = false;
    let lastFrame = 0;
    let animTime = 0;
    let cameraAngle = 0;
    let slowAccum = 0;
    let slowFrames = 0;
    const minInterval = 1000 / config.maxFps - 2; // slack for vsync jitter

    const step = (dtScale: number) => {
      animTime += config.animSpeed * dtScale;

      cameraAngle += config.cameraSpeed * dtScale;
      camera.position.set(Math.sin(cameraAngle) * 40, 10, Math.cos(cameraAngle) * 40);
      camera.lookAt(lookAtTarget);

      if (Math.random() < config.spikeProb * dtScale) { const i = pickIdle(); if (i >= 0) triggerSpike(i); }
      if (Math.random() < config.dropProb * dtScale) { const i = pickIdle(); if (i >= 0) triggerDrop(i); }

      let hasMouse = false;
      if (mouseEnabled && mouseActive) {
        camera.updateMatrixWorld();
        raycaster.setFromCamera(mouse, camera);
        hasMouse = raycaster.ray.intersectPlane(mousePlane, mouseIntersection) !== null;
      }
      const mx = mouseIntersection.x;
      const my = mouseIntersection.y;
      const mz = mouseIntersection.z;
      const progStep = 0.015 * dtScale;

      for (let i = 0; i < dotCount; i++) {
        const depth = dotDepth[i];
        let y = Math.sin(animTime * dotFreq[i] + dotPhase[i]) * dotAmp[i] * (1 - depth * 0.5);

        if (spiking[i]) {
          const p = (spikeProg[i] += progStep);
          if (p >= 1) spiking[i] = 0;
          y += Math.sin(p * Math.PI) * spikeHeight[i];
        }
        if (dropping[i]) {
          const p = (dropProg[i] += progStep);
          if (p >= 1) dropping[i] = 0;
          y += Math.sin(p * Math.PI) * dropDepth[i];
        }

        dotY[i] = y;

        if (hasMouse && !spiking[i] && !dropping[i]) {
          const dx = dotX[i] - mx;
          const dy = y - my;
          const dz = dotZ[i] - mz;
          const distSq = dx * dx + dy * dy + dz * dz;
          const radius = 5 * (1 - depth * 0.5);
          if (distSq < radius * radius) {
            // dist/radius < 0.5  <=>  distSq < (radius/2)^2
            if (distSq < radius * radius * 0.25) triggerSpike(i); else triggerDrop(i);
          }
        }

        matrixArray[i * 16 + 13] = y;
      }
      instancedMesh.instanceMatrix.needsUpdate = true;

      // Compact visible segments into the front of the buffers
      let v = 0;
      for (let k = 0; k < segCount; k++) {
        const a = lineA[k];
        const b = lineB[k];
        const ax = dotX[a], ay = dotY[a], az = dotZ[a];
        const bx = dotX[b], by = dotY[b], bz = dotZ[b];
        const dx = ax - bx, dy = ay - by, dz = az - bz;
        const distSq = dx * dx + dy * dy + dz * dz;
        if (distSq >= lineMaxDistSq[k]) continue;

        const dist = Math.sqrt(distSq);
        const alpha = (1 - dist / lineMaxDist[k]) * lineFade[k];
        const r = LINE_R * alpha, g = LINE_G * alpha, bl = LINE_B * alpha;
        const o = v * 6;
        linePositions[o] = ax; linePositions[o + 1] = ay; linePositions[o + 2] = az;
        linePositions[o + 3] = bx; linePositions[o + 4] = by; linePositions[o + 5] = bz;
        lineColors[o] = r; lineColors[o + 1] = g; lineColors[o + 2] = bl;
        lineColors[o + 3] = r; lineColors[o + 4] = g; lineColors[o + 5] = bl;
        v++;
      }
      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;
      lineGeometry.setDrawRange(0, v * 2);
    };

    const slowThreshold = (1000 / config.maxFps) * SLOW_FACTOR;
    let warmup = WARMUP_FRAMES;
    let slowWindows = 0;

    const adaptResolution = (frameMs: number) => {
      if (warmup > 0) { warmup--; return; }
      if (frameMs >= 100) return; // hitch / tab switch, not sustained slowness
      slowAccum += frameMs;
      if (++slowFrames < ADAPT_WINDOW) return;
      const avg = slowAccum / slowFrames;
      slowAccum = 0;
      slowFrames = 0;
      slowWindows = avg > slowThreshold ? slowWindows + 1 : 0;
      // Only ever scale down — avoids oscillation
      if (slowWindows >= SLOW_WINDOWS_TO_STEP && pixelRatio > MIN_PIXEL_RATIO) {
        slowWindows = 0;
        pixelRatio = Math.max(MIN_PIXEL_RATIO, pixelRatio * PIXEL_RATIO_STEP);
        renderer.setPixelRatio(pixelRatio);
        renderer.setSize(width, height);
      }
    };

    const frame = (now: number) => {
      if (!running) return;
      rafId = requestAnimationFrame(frame);

      const elapsed = now - lastFrame;
      if (elapsed < minInterval) return; // cap fps (e.g. 120Hz displays, low tier 30fps)
      lastFrame = now;

      const clamped = Math.min(elapsed, 100); // tab-switch / hitch guard
      step((clamped / REF_FRAME_MS) * TIME_SCALE);
      renderer.render(scene, camera);
      adaptResolution(clamped);
    };

    const start = () => {
      if (running || reducedMotion) return;
      running = true;
      lastFrame = performance.now();
      slowAccum = 0;
      slowFrames = 0;
      slowWindows = 0;
      warmup = Math.max(warmup, 30);
      rafId = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(rafId);
    };

    // ── Events ──
    const onVisibility = () => (document.hidden ? stop() : start());

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mouseActive = true;
    };
    const onMouseLeave = () => { mouseActive = false; };

    let resizeRaf = 0;
    const applySize = () => {
      resizeRaf = 0;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      if (w === width && h === height) return; // address-bar toggles don't change 100lvh
      width = w;
      height = h;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      if (reducedMotion) renderer.render(scene, camera);
    };
    const onResize = () => {
      if (!resizeRaf) resizeRaf = requestAnimationFrame(applySize);
    };

    const onContextLost = (e: Event) => { e.preventDefault(); stop(); };
    const onContextRestored = () => {
      if (reducedMotion) renderer.render(scene, camera);
      else start();
    };

    if (mouseEnabled && !reducedMotion) {
      window.addEventListener('mousemove', onMouseMove, { passive: true });
      document.documentElement.addEventListener('mouseleave', onMouseLeave);
    }
    window.addEventListener('resize', onResize, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);
    renderer.domElement.addEventListener('webglcontextrestored', onContextRestored);

    if (reducedMotion) {
      // Single static frame; no animation loop at all
      step(1);
      renderer.render(scene, camera);
    } else if (!document.hidden) {
      start();
    }

    return () => {
      stop();
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      window.removeEventListener('mousemove', onMouseMove);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', onContextRestored);

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }

      instancedMesh.dispose();
      dotGeometry.dispose();
      dotMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="webgl-bg"
      style={{ zIndex: -1, background: '#000', overflow: 'hidden' }}
    />
  );
};

export default DotNetworkBackground;
