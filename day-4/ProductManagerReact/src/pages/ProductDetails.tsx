import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { Product } from '@customTypes/Product';
import getProductById from '@api/getProductById';

import ProductDetailsCard from '@features/common/ProductDetailsCard';

export default function ProductDetails() {
  const { id } = useParams();

  const { data, isLoading, isFetching, isRefetching, error } = useQuery<
    Product,
    AxiosError
  >({
    queryKey: ['product', id],
    queryFn: () => getProductById({ id: id as string }),
    staleTime: 1000 * 60 * 30, // Keep Fresh for 30 Minutes
    cacheTime: 1000 * 60 * 60 * 2, // Keep Cache for 2 Hours
    // Don't Retry or Refetch on 404
    retry: (failureCount, error) =>
      error.response?.status !== 404 && failureCount < 3,
    refetchOnWindowFocus: (query): boolean =>
      query.isActive() && error?.response?.status !== 404,
    refetchOnMount: (query): boolean =>
      query.isActive() && error?.response?.status !== 404,
    refetchOnReconnect: (query): boolean =>
      query.isActive() && error?.response?.status !== 404,
  });

  if (isLoading || isFetching || isRefetching) {
    // TODO: Add a Proper loading Indicator
    return <>Loading...</>;
  }

  return (
    <ProductDetailsCard product={data!} onDelete={(id) => console.log(id)} />
  );
}
