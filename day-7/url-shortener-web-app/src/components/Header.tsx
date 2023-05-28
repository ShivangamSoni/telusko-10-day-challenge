'use client';

import { usePathname } from 'next/navigation';

import NavLink from './NavLink';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between py-4">
      <h1 className="tracking-wider text-primary-red text-2xl sm:text-3xl md:text-4xl font-bold">
        urls
      </h1>

      <nav>
        <ul className="flex items-center gap-4">
          <li>
            <NavLink href="/" isActive={pathname === '/'}>
              Shorten
            </NavLink>
          </li>
          <li>
            <NavLink href="/expand" isActive={pathname.startsWith('/expand')}>
              Expand
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
