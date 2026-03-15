'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { href: '/', label: '首页' },
  { href: '/divination', label: '开始占卜' },
  { href: '/history', label: '历史记录' },
  { href: '/about', label: '关于' },
  { href: '/disclaimer', label: '免责声明' }
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-bg/80 backdrop-blur-xl">
      <div className="container-shell flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-wide text-accent">
          玄机问事
        </Link>
        <nav className="hidden gap-2 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                'rounded-lg px-3 py-2 text-sm transition',
                pathname === link.href ? 'bg-white/10 text-accent' : 'text-slate-300 hover:bg-white/5'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
