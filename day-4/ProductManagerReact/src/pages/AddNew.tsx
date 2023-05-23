import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { object, string, number, InferType } from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';

import { Product } from '@customTypes/Product';
import addProduct from '@api/addProduct';
import { useNavigate } from 'react-router-dom';

const FormSchema = object({
  name: string().required("Name, can't be empty"),
  type: string().required("Type, can't be empty"),
  place: string().required("Place, can't be empty"),
  warranty: number().required("Warranty, can't be empty"),
});
type FormState = InferType<typeof FormSchema>;

export default function AddNew() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation<
    { message: string },
    AxiosError,
    Omit<Product, 'id'>
  >({
    mutationFn: (product) => addProduct(product),
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormState>({
    resolver: yupResolver(FormSchema),
  });

  async function submitHandler(state: FormState) {
    await mutateAsync(state);
    navigate('/');
  }

  return (
    <Center>
      <Box
        as="form"
        onSubmit={handleSubmit(submitHandler)}
        bg={'white'}
        p={4}
        rounded={'lg'}
        w={'min(500px, 95%)'}
      >
        <FormControl isInvalid={errors.name != null} mb={4}>
          <FormLabel>Name</FormLabel>
          <Input {...register('name')} type="text" />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.type != null} mb={4}>
          <FormLabel>Type</FormLabel>
          <Input {...register('type')} type="text" />
          <FormErrorMessage>{errors.type?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.place != null} mb={4}>
          <FormLabel>Place</FormLabel>
          <Input {...register('place')} type="text" />
          <FormErrorMessage>{errors.place?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.warranty != null} mb={4}>
          <FormLabel>Warranty</FormLabel>
          <Input {...register('warranty')} type="number" />
          <FormErrorMessage>{errors.warranty?.message}</FormErrorMessage>
        </FormControl>

        <Flex justifyContent={'end'}>
          <Button type="submit" mt={4} colorScheme="green">
            Add Product
          </Button>
        </Flex>
      </Box>
    </Center>
  );
}
