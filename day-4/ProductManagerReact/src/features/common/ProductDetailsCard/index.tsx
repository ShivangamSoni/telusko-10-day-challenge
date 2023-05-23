import { Link } from 'react-router-dom';

import {
  Box,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Badge,
  Button,
  Center,
} from '@chakra-ui/react';

import { Product } from '@customTypes/Product';

const IMAGE =
  'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80';

interface Props {
  product: Product;
  onDelete: (id: Product['id']) => void;
}

export default function ProductDetailsCard({
  product: { id, name, place, type, warranty },
  onDelete,
}: Props) {
  const isExpired = warranty < new Date().getFullYear();

  return (
    <Center>
      <Box
        role={'group'}
        p={6}
        maxW={'280px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}
        mt={5}
      >
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'230px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${IMAGE})`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Image
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'cover'}
            src={IMAGE}
          />
        </Box>
        <Stack pt={10} align={'center'}>
          <Link
            to={`/products/place/${place}`}
            title={`View All Products at ${place}`}
          >
            <Text
              color={'gray.500'}
              fontSize={'md'}
              textTransform={'uppercase'}
            >
              {place}
            </Text>
          </Link>
          <Stack direction={'row'} align={'center'}>
            <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
              {name}
            </Heading>
            {/* TODO: OnClick Search for Type */}
            <Badge colorScheme={isExpired ? 'red' : 'blue'}>{type}</Badge>
          </Stack>
          <Text
            fontSize={'lg'}
            color={'gray.600'}
            textDecoration={isExpired ? 'line-through' : ''}
          >
            {warranty}
          </Text>
        </Stack>
        <Stack mt={4}>
          <Button colorScheme="red" onClick={() => onDelete(id)}>
            Delete
          </Button>
        </Stack>
      </Box>
    </Center>
  );
}
