'use client';

import Link from 'next/link';
import { ComponentProps } from 'react';

interface Props extends ComponentProps<typeof Link> {
  isActive: boolean;
}

export default function NavLink({
  isActive,
  children,
  className,
  ...props
}: Props) {
  return (
    <Link
      {...props}
      className={`text-lg border-none outline-none px-4 py-2 transition-colors ease-in-out duration-300 relative isolate after:content-[''] after:absolute after:inset-0 after:bg-primary-blue after:-z-10 after:transition-transform after:ease-in-out after:duration-300 after:[transform-origin:right] ${
        isActive
          ? 'font-semibold text-white after:scale-y-100 after:scale-x-100'
          : 'after:scale-y-75 after:scale-x-0 hover:after:[transform-origin:left] hover:after:scale-x-100 hover:text-white focus-visible:after:[transform-origin:left] focus-visible:after:scale-x-100 focus-visible:text-white'
      }`}
    >
      {children}
    </Link>
  );
}
