import { useSearchParams } from 'react-router-dom';

import { Box, Grid, Heading } from '@chakra-ui/react';

import MockProducts from '@data/mockProducts.json';

import ProductList from '@features/common/ProductList';
import Pagination from '@features/common/Pagination';

export default function Search() {
  const q = useSearchParams()[0].get('q');

  return (
    <Grid
      h={'full'}
      gridTemplateRows={'auto 1fr auto'}
      alignItems={'start'}
      gap={2}
    >
      <Heading>Search Term: `{q}`</Heading>
      <ProductList products={MockProducts} />
      <Box position={'sticky'} bottom={5} zIndex={100}>
        <Pagination
          totalPages={5}
          currentPage={0}
          onNext={() => console.log('Next')}
          onPrev={() => console.log('Prev')}
          onPageSelect={(page) => console.log('Selected: ', page)}
        />
      </Box>
    </Grid>
  );
}
