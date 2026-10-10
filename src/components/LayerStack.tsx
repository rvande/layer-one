'use client';

import { useEffect, useRef, useState } from 'react';

interface Row {
  n: number;
  name: string;
  svc: string;
}

const PDU: Record<number, string> = { 7: 'Data', 6: 'Data', 5: 'Data', 4: 'Segment', 3: 'Packet', 2: 'Frame', 1: 'Bits' };

/** The seven network layers, with a packet that travels down to layer one and back up. */
export function LayerStack({ label, caption, rows }: { label: string; caption: string; rows: Row[] }) {
  const olRef = useRef<HTMLOListElement>(null);
  const pktRef = useRef<HTMLSpanElement>(null);
  const [hit, setHit] = useState<number | null>(null);
  const [dir, setDir] = useState('');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ol = olRef.current;
    const pkt = pktRef.current;
    if (!ol || !pkt) return;

    const items = Array.from(ol.querySelectorAll<HTMLElement>(':scope > li'));
    const y = (li: HTMLElement) => li.offsetTop + li.offsetHeight / 2 - 7;
    let i = 0;
    let step = 1;
    let timer: ReturnType<typeof setTimeout>;

    const go = () => {
      pkt.style.transform = `translateY(${y(items[i])}px)`;
      setHit(i);
      const pdu = PDU[rows[i].n].toLowerCase();
      setDir(step > 0 ? `sending ↓ ${pdu}` : `receiving ↑ ${pdu}`);
      let wait = 480;
      if (i === items.length - 1 && step > 0) {
        step = -1;
        wait = 1100;
        pkt.classList.remove('pulse');
        void pkt.offsetWidth;
        pkt.classList.add('pulse');
      } else if (i === 0 && step < 0) {
        step = 1;
        wait = 1300;
      }
      i += step;
      timer = setTimeout(go, wait);
    };

    pkt.hidden = false;
    pkt.style.transform = `translateY(${y(items[0])}px)`;
    timer = setTimeout(go, 1200);
    return () => clearTimeout(timer);
  }, [rows]);

  return (
    <figure className="stack" aria-label={label}>
      <ol ref={olRef}>
        {rows.map((r, idx) => (
          <li key={r.n} className={`${r.n === 1 ? 'one' : 'on'}${hit === idx ? ' hit' : ''}`}>
            <span className="n">{r.n}</span>
            <span className="name">
              {r.name}
              <span className="pdu" aria-hidden="true">
                {PDU[r.n]}
              </span>
            </span>
            <span className="svc">{r.svc}</span>
          </li>
        ))}
        <span ref={pktRef} className="pkt" aria-hidden="true" hidden />
      </ol>
      <p className="dir" aria-hidden="true">
        {dir}
      </p>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
