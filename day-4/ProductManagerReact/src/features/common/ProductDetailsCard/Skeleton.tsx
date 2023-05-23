import {
  Box,
  useColorModeValue,
  Stack,
  Center,
  Skeleton,
  Flex,
} from '@chakra-ui/react';

export default function ProductDetailsCardSkeleton() {
  return (
    <Center>
      <Box
        p={6}
        maxW={'280px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        mt={5}
      >
        <Skeleton height={'230px'} w={'full'} rounded={'lg'} />
        <Stack align={'center'} mt={10}>
          <Skeleton h={6} w={'50%'} />
          <Flex align={'start'} justifyContent={'center'} gap={2} w={'full'}>
            <Skeleton h={6} w={'50%'} />
            <Skeleton h={4} w={'25%'} />
          </Flex>
        </Stack>
        <Stack mt={4}>
          <Skeleton w={'100%'} h={10} />
        </Stack>
      </Box>
    </Center>
  );
}
