import axios from '@axios/index';

import { Product } from '@customTypes/Product';

export default async function deleteProduct(id: Product['id']) {
  const { data } = await axios.delete(`/product/${id}`);
  return data;
}
