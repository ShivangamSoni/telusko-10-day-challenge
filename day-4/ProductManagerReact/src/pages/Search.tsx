import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { Box, Grid, Heading, Text } from '@chakra-ui/react';

import { ProductResponse } from '@customTypes/ProductResponse';
import searchProducts from '@api/searchProducts';

import usePagination from '@hooks/usePagination';

import ProductListSkeleton from '@features/common/ProductList/Skeleton';
import ProductList from '@features/common/ProductList';
import Pagination from '@features/common/Pagination';

export default function Search() {
  const q = useSearchParams()[0].get('q');

  const { page, onNext, onPrev, onPageSelect } = usePagination(0);
  const { data, isLoading, isFetching, isRefetching, error } = useQuery<
    ProductResponse,
    AxiosError
  >({
    queryKey: ['products', q, page],
    queryFn: () => searchProducts({ q: q as string, page }),
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
      <Heading>Search Term: `{q}`</Heading>

      {(isLoading || isFetching || isRefetching) && <ProductListSkeleton />}

      {data && data.content && data.content.length > 0 ? (
        <>
          <ProductList products={data.content} highlight={q as string} />
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
