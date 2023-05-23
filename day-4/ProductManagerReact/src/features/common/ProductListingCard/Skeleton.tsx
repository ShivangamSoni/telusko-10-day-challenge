import {
  Box,
  useColorModeValue,
  Stack,
  Skeleton,
  Flex,
} from '@chakra-ui/react';

export default function ProductListingCardSkeleton() {
  return (
    <Box
      p={6}
      w={'full'}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'2xl'}
      rounded={'lg'}
      zIndex={1}
      mt={5}
    >
      <Stack align={'center'}>
        <Skeleton h={6} w={'30%'} />
        <Flex align={'start'} justifyContent={'center'} gap={2} w={'full'}>
          <Skeleton h={6} w={'30%'} />
          <Skeleton h={4} w={'15%'} />
        </Flex>
      </Stack>
    </Box>
  );
}
