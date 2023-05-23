import { Link } from 'react-router-dom';

import { Button, Center, Heading, Text, VStack } from '@chakra-ui/react';

export default function NotFound() {
  return (
    <Center p={6} h={'full'}>
      <VStack spacing={6}>
        <Heading fontSize={'9xl'}>
          <Text srOnly>Error</Text>404
          <Text srOnly>Requested Page Not Found</Text>
        </Heading>
        <Text fontSize={'4xl'}>Sorry, we couldn't find this page.</Text>
        <Text fontSize={'xl'}>
          But don't worry, you can find plenty of other things on our homepage.
        </Text>
        <Button>
          <Link to="/">Back to homepage</Link>
        </Button>
      </VStack>
    </Center>
  );
}
