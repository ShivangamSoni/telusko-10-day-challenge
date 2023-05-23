import { ReactNode } from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';

import { Link, useColorModeValue } from '@chakra-ui/react';

export default function NavLink({
  children,
  to,
}: {
  children: ReactNode;
  to: string;
}) {
  const hoverBg = useColorModeValue('gray.300', 'gray.700');

  return (
    <RouterNavLink to={to}>
      {({ isActive }) => (
        <Link
          px={3}
          py={2}
          rounded={'md'}
          _hover={{
            textDecoration: 'none',
            bg: hoverBg,
          }}
          as="span"
          fontWeight={isActive ? 'bold' : 'normal'}
          bg={{ md: isActive ? hoverBg : 'transparent' }}
        >
          {children}
        </Link>
      )}
    </RouterNavLink>
  );
}
