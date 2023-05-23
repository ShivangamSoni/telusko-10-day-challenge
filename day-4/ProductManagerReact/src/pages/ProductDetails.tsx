import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { Product } from '@customTypes/Product';
import getProductById from '@api/getProductById';

import ProductDetailsCard from '@features/common/ProductDetailsCard';
import deleteProduct from '@api/deleteProduct';
import ProductDetailsCardSkeleton from '@features/common/ProductDetailsCard/Skeleton';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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

  const { mutateAsync } = useMutation<
    { message: string },
    AxiosError,
    Product['id']
  >({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
      navigate(-1);
    },
  });

  console.log(data);

  return (
    <>
      {isLoading || isFetching || isRefetching ? (
        <ProductDetailsCardSkeleton />
      ) : data && data != null ? (
        <ProductDetailsCard product={data} onDelete={(id) => mutateAsync(id)} />
      ) : (
        <Navigate to={'/404'} />
      )}
    </>
  );
}
