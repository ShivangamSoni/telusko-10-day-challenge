import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

import NavLink from '@components/NavLink';
import SearchBar from './SearchBar';

const Links = [
  { to: '/', label: 'Products' },
  { to: '/products/add', label: 'Add Product' },
  { to: '/products/expired', label: 'Expired Products' },
];

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const NavLinks = Links.map(({ to, label }) => (
    <NavLink key={to} to={to}>
      {label}
    </NavLink>
  ));
  return (
    <Box
      as="header"
      bg={useColorModeValue('gray.100', 'gray.900')}
      px={4}
      pb={4}
      mb={10}
    >
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack
          w={{ md: '100%' }}
          spacing={8}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Box>Product Manager</Box>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            {NavLinks}
          </HStack>
        </HStack>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {NavLinks}
          </Stack>
        </Box>
      ) : null}

      <SearchBar />
    </Box>
  );
}
