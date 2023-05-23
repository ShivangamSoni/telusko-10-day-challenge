import { Link } from 'react-router-dom';

import {
  Box,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Badge,
} from '@chakra-ui/react';

import { Product } from '@customTypes/Product';

interface Props {
  product: Product;
}

export default function ProductListingCard({
  product: { name, place, type, warranty },
}: Props) {
  const isExpired = warranty < new Date().getFullYear();

  return (
    <Box
      role={'group'}
      p={6}
      w={'full'}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'2xl'}
      rounded={'lg'}
      zIndex={1}
      mt={5}
    >
      <Stack align={'center'}>
        <Link
          to={`/products/place/${place}`}
          title={`View All Products at ${place}`}
        >
          <Text color={'gray.500'} fontSize={'md'} textTransform={'uppercase'}>
            {place}
          </Text>
        </Link>
        <Stack direction={'row'} align={'center'}>
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
            <Link to={`/products/${name}`}>{name}</Link>
          </Heading>
          {/* TODO: OnClick Search for Type */}
          <Badge
            colorScheme={isExpired ? 'red' : 'blue'}
            title={`Search all of Type ${type}`}
          >
            {type}
          </Badge>
        </Stack>
      </Stack>
    </Box>
  );
}
