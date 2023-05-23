import axios from '@axios/index';

import { Product } from '@customTypes/Product';

export default async function getProductById({ id }: { id: string }) {
  const { data } = await axios.get<Product>(`/product/${id}`);
  return data;
}
