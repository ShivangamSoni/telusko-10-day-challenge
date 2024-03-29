import { Flex, Grid } from '@chakra-ui/react';

import { Product } from '@customTypes/Product';

import ProductListingCard from '../ProductListingCard';

export default function ProductList({
  products,
  highlight,
}: {
  products: Product[];
  highlight?: string;
}) {
  return (
    <Flex direction="column" justifyContent="center">
      <Grid
        w="full"
        gridGap="5"
        gridTemplateColumns="repeat( auto-fit, minmax(280px, 1fr) )"
      >
        {products.map((product) => (
          <ProductListingCard
            key={product.id}
            product={product}
            highlight={highlight}
          />
        ))}
      </Grid>
    </Flex>
  );
}
