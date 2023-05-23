import { Flex, Grid } from '@chakra-ui/react';

import { generateArray } from '@utils/generateArray';

import ProductListingCardSkeleton from '../ProductListingCard/Skeleton';

export default function ProductListSkeleton() {
  return (
    <Flex direction="column" justifyContent="center">
      <Grid
        w="full"
        gridGap="5"
        gridTemplateColumns="repeat( auto-fit, minmax(280px, 1fr) )"
      >
        {generateArray(10).map((i) => (
          <ProductListingCardSkeleton key={i} />
        ))}
      </Grid>
    </Flex>
  );
}
