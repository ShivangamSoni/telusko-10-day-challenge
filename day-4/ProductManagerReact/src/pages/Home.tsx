import { Box, Grid, Heading } from '@chakra-ui/react';

import MockProducts from '@data/mockProducts.json';

import ProductList from '@features/common/ProductList';
import Pagination from '@features/common/Pagination';

export default function Home() {
  return (
    <Grid
      h={'full'}
      gridTemplateRows={'auto 1fr auto'}
      alignItems={'start'}
      gap={2}
    >
      <Heading textTransform={'uppercase'}>All Products</Heading>
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
