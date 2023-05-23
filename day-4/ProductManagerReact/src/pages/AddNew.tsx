import { useNavigate } from 'react-router-dom';
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
  Image,
  Input,
} from '@chakra-ui/react';

import { Product } from '@customTypes/Product';
import addProduct from '@api/addProduct';

import UnSplashImagePickerModal from 'unsplash-image-picker';
import 'unsplash-image-picker/dist/index.css';
import { useState } from 'react';

const FormSchema = object({
  name: string().required("Name, can't be empty"),
  type: string().required("Type, can't be empty"),
  place: string().required("Place, can't be empty"),
  warranty: number().required("Warranty, can't be empty"),
  imageUrl: string().required('Please select an Image'),
});
type FormState = InferType<typeof FormSchema>;

export default function AddNew() {
  const [imagePicker, setImagePicker] = useState(false);
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
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormState>({
    resolver: yupResolver(FormSchema),
  });

  async function submitHandler(state: FormState) {
    await mutateAsync(state);
    navigate('/');
  }

  const imageUrl = getValues('imageUrl');

  console.log(import.meta.env);

  return (
    <Center pb={10}>
      <Box
        as="form"
        onSubmit={handleSubmit(submitHandler)}
        bg={'white'}
        p={4}
        rounded={'lg'}
        w={'min(500px, 95%)'}
      >
        <FormControl
          isInvalid={errors.warranty != null}
          mb={4}
          display={'flex'}
          flexDirection={'column'}
          gap={2}
        >
          <FormLabel>Product Image</FormLabel>
          <Image
            src={imageUrl}
            fallbackSrc="https://via.placeholder.com/300"
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'cover'}
            alignSelf={'center'}
          />
          <Button onClick={() => setImagePicker(true)}>Select an Image</Button>
          <FormErrorMessage>{errors.imageUrl?.message}</FormErrorMessage>
        </FormControl>

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

      <UnSplashImagePickerModal
        unsplashAccessKey={import.meta.env.VITE_UNSPLASH_ACCESSKEY}
        onPhotoSelect={(photo) => {
          setValue('imageUrl', photo.urls.small);
          setImagePicker(false);
        }}
        active={imagePicker}
        setActive={setImagePicker}
      />
    </Center>
  );
}
