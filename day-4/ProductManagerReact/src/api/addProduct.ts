import axios from '@axios/index';

import { Product } from '@customTypes/Product';

export default async function addProduct(product: Omit<Product, 'id'>) {
  const { data } = await axios.post('/product', product);
  return data;
}
