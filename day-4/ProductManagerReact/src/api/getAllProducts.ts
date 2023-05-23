import axios from '@axios/index';

import { ProductResponse } from '@customTypes/ProductResponse';

export default async function getAllProducts({ page = 0 }: { page?: number }) {
  const { data } = await axios.get<ProductResponse>(
    `/products?size=10&page=${page}`,
  );
  return data;
}
