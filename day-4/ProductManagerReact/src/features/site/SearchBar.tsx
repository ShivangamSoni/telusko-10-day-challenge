import { object, string, InferType } from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const FormSchema = object({
  search: string().required("Whoops, can't be empty"),
});
type FormState = InferType<typeof FormSchema>;

export default function SearchBar() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormState>({
    resolver: yupResolver(FormSchema),
  });

  function submitHandler({ search }: FormState) {
    const queryParams = new URLSearchParams();
    queryParams.append('q', search);
    navigate(`/products/search?${queryParams.toString()}`);
  }

  return (
    <Box as="form" onSubmit={handleSubmit(submitHandler)}>
      <FormControl isInvalid={errors.search != null}>
        <InputGroup>
          <Input
            {...register('search')}
            type="text"
            placeholder="Search Product Name, Type or Place"
          />
          <InputRightElement w={'fit-content'} px={1}>
            <Button size={'sm'} colorScheme="cyan" type="submit">
              Search
            </Button>
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>{errors.search?.message}</FormErrorMessage>
      </FormControl>
    </Box>
  );
}
