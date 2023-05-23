import { Outlet } from 'react-router-dom';

import { Box, Container, useColorModeValue } from '@chakra-ui/react';

import Header from './Header';

export default function RootLayout() {
  return (
    <Box bg={useColorModeValue('facebook.100', 'facebook.800')}>
      <Container
        maxW="container.xl"
        minH="100vh"
        py="5"
        px="0"
        w="92%"
        display={'grid'}
        gridTemplateRows={'auto 1fr'}
      >
        <Header />
        <Box as="main">
          <Outlet />
        </Box>
      </Container>
    </Box>
  );
}
