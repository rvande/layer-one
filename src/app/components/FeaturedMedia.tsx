'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

const frame =
  'relative overflow-hidden rounded-xl border border-white/10 bg-black/60 shadow-[0_0_40px_rgba(235,106,30,0.12)]';

export default function FeaturedMedia() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Play only while on screen (saves CPU/battery). Respects reduced motion and never
  // overrides a pause the viewer made themselves.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    let visible = false;
    let userPaused = false;
    let autoPaused = false;

    const onPause = () => {
      if (visible && !autoPaused) userPaused = true; // paused by the viewer, not by us
      autoPaused = false;
    };
    const onPlay = () => { userPaused = false; };
    video.addEventListener('pause', onPause);
    video.addEventListener('play', onPlay);

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          if (!userPaused) video.play().catch(() => {});
        } else if (!video.paused) {
          autoPaused = true;
          video.pause();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(video);
    return () => {
      observer.disconnect();
      video.removeEventListener('pause', onPause);
      video.removeEventListener('play', onPlay);
    };
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6 sm:gap-8 mt-6 sm:mt-10">
      {/* Forever Faded announcement poster */}
      <Link
        href="https://foreverfadedmke.com/"
        target="_blank"
        rel="noopener noreferrer"
        className={`${frame} aspect-video block transition-transform hover:scale-[1.01]`}
      >
        <Image
          src="/forever-faded-coming-2027-poster-1920x1080.webp"
          alt="The Forever Faded app, an app by Layer One IT Consultants, coming in 2027"
          fill
          priority
          sizes="(min-width: 1024px) 1024px, 100vw"
          className="object-cover"
        />
        <span className="sr-only">(opens in a new tab)</span>
      </Link>

      {/* Video + TAG promo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
        <figure className="mx-auto w-full max-w-[420px] md:max-w-none flex flex-col gap-3">
          <div className={frame} style={{ aspectRatio: '1040 / 1360' }}>
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              src="/71e3b448-ea02-44e9-8efb-9d48c83cd3e9.mp4"
              muted
              loop
              playsInline
              controls
              preload="metadata"
              aria-label="Pyxis promo video"
            />
          </div>
          <figcaption className="text-center text-white font-[orbitron] tracking-wider text-lg sm:text-xl">
            Pyxis <span className="text-[#eb6a1e]">&ndash;</span> Coming in 2027
          </figcaption>
        </figure>

        <Link
          href="https://tagme.layeroneconsultants.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto w-full max-w-[420px] md:max-w-none flex flex-col gap-3 group"
        >
          <div className={`${frame} aspect-square transition-transform group-hover:scale-[1.01]`}>
            <Image
              src="/tag-promo-04-phrase.webp"
              alt="TAG: Break the algorithm. Real friends, zero algorithms."
              fill
              sizes="(min-width: 768px) 512px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="text-center">
            <p className="text-white font-[orbitron] tracking-wider text-lg sm:text-xl">Tag, You&rsquo;re It</p>
            <p className="text-[#eb6a1e] text-sm sm:text-base tracking-wide">Anti-Social Media App</p>
            <p className="text-white/70 text-sm sm:text-base">Real friends. Zero algorithms.</p>
            <span className="sr-only">(opens in a new tab)</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
