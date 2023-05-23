import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { Product } from '@customTypes/Product';
import getProductById from '@api/getProductById';

import ProductDetailsCard from '@features/common/ProductDetailsCard';

export default function ProductDetails() {
  const { id } = useParams();

  const { data, isLoading, isFetching, isRefetching } = useQuery<
    Product,
    AxiosError
  >({
    queryKey: ['product', id],
    queryFn: () => getProductById({ id: id as string }),
  });

  if (isLoading || isFetching || isRefetching) {
    // TODO: Add a Proper loading Indicator
    return <>Loading...</>;
  }

  return (
    <ProductDetailsCard product={data!} onDelete={(id) => console.log(id)} />
  );
}
