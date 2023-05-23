import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { Box, Grid, Heading, Text } from '@chakra-ui/react';

import { ProductResponse } from '@customTypes/ProductResponse';
import getExpiredProducts from '@api/getExpiredProducts';

import ProductList from '@features/common/ProductList';
import Pagination from '@features/common/Pagination';

export default function Expired() {
  const [page, setPage] = useState(0);
  const { data, isLoading, isFetching, isRefetching, error } = useQuery<
    ProductResponse,
    AxiosError
  >({
    queryKey: ['products', 'expired', page],
    queryFn: () => getExpiredProducts({ page }),
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

  function onNext() {
    setPage((prev) => {
      const next = prev + 1;
      if (data!.totalPages >= next) {
        return data!.totalPages - 1;
      }
      return next;
    });
  }

  function onPrev() {
    setPage((prev) => {
      const next = prev - 1;
      if (next < 0) {
        return 0;
      }
      return next;
    });
  }

  function onPageSelect(newPage: number) {
    setPage(newPage);
  }

  if (isLoading || isFetching || isRefetching) {
    // TODO: Add a Proper loading Indicator
    return <>Loading...</>;
  }

  return (
    <Grid
      h={'full'}
      gridTemplateRows={'auto 1fr auto'}
      alignItems={'start'}
      gap={2}
    >
      <Heading>Expired Warranty Products</Heading>
      {data && data.content && data.content.length > 0 ? (
        <>
          <ProductList products={data.content} />
          <Box position={'sticky'} bottom={5} zIndex={100}>
            <Pagination
              totalPages={data.totalPages}
              currentPage={page}
              onNext={onNext}
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
