import ProductDetailsCard from '@features/common/ProductDetailsCard';

import MockupData from '@data/mockProducts.json';

export default function ProductDetails() {
  return (
    <ProductDetailsCard
      product={MockupData[0]}
      onDelete={(id) => console.log(id)}
    />
  );
}
