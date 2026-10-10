'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const sections = [
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/about/joseph-henderson', label: 'About' },
];

function isCurrent(pathname: string, href: string) {
  const root = `/${href.split('/')[1]}`;
  return pathname === root || pathname.startsWith(`${root}/`);
}

export function Header() {
  const pathname = usePathname();
  const [openAt, setOpenAt] = useState<string | null>(null);
  // The menu closes whenever the route changes.
  const open = openAt === pathname;

  return (
    <header className="site-header">
      <div className="wrap">
        <Link className="brand" href="/" aria-label="Layer One IT Consultants, home">
          <Image src="/assets/layer-one-dark.png" alt="Layer One" width={913} height={68} priority />
        </Link>
        <button
          className="menu-btn"
          type="button"
          aria-expanded={open}
          aria-controls="nav"
          onClick={() => setOpenAt(open ? null : pathname)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
        <nav
          className={`nav${open ? ' open' : ''}`}
          id="nav"
          aria-label="Main"
          onClick={(e) => {
            if ((e.target as HTMLElement).tagName === 'A') setOpenAt(null);
          }}
        >
          {sections.map((s) => (
            <Link key={s.href} href={s.href} aria-current={isCurrent(pathname, s.href) ? 'page' : undefined}>
              {s.label}
            </Link>
          ))}
          <a href="#contact">Contact</a>
          <a className="btn small" href="#contact">
            Book a free consultation
          </a>
        </nav>
      </div>
    </header>
  );
}
