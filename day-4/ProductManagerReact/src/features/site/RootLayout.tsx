import { Outlet } from 'react-router-dom';

import { Box, Container, useColorModeValue } from '@chakra-ui/react';

import Header from './Header';

export default function RootLayout() {
  return (
    <Box
      bg={useColorModeValue('facebook.100', 'facebook.800')}
      minH="100vh"
      py="10"
    >
      <Container maxW="container.xl" w="92%" p="0">
        <Header />
        <main>
          <Outlet />
        </main>
      </Container>
    </Box>
  );
}
