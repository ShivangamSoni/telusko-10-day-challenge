import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { Box, Grid, Heading, Text } from '@chakra-ui/react';

import { ProductResponse } from '@customTypes/ProductResponse';
import getAllProducts from '@api/getAllProducts';

import usePagination from '@hooks/usePagination';

import ProductListSkeleton from '@features/common/ProductList/Skeleton';
import ProductList from '@features/common/ProductList';
import Pagination from '@features/common/Pagination';

export default function Home() {
  const { page, onNext, onPrev, onPageSelect } = usePagination(0);
  const { data, isLoading, isFetching, isRefetching, error } = useQuery<
    ProductResponse,
    AxiosError
  >({
    queryKey: ['products', page],
    queryFn: () => getAllProducts({ page }),
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

  return (
    <Grid
      h={'full'}
      gridTemplateRows={'auto 1fr auto'}
      alignItems={'start'}
      gap={2}
    >
      <Heading textTransform={'uppercase'}>All Products</Heading>

      {(isLoading || isFetching || isRefetching) && <ProductListSkeleton />}

      {data && data.content && data.content.length > 0 ? (
        <>
          <ProductList products={data.content} />
          <Box position={'sticky'} bottom={5} zIndex={100}>
            <Pagination
              totalPages={data.totalPages}
              currentPage={page}
              onNext={() => onNext(data.totalPages)}
              onPrev={onPrev}
              onPageSelect={onPageSelect}
            />
          </Box>
        </>
      ) : (
        <Text>No Products Available! Try adding some</Text>
      )}
    </Grid>
  );
}
