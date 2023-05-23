import axios from '@axios/index';

import { ProductResponse } from '@customTypes/ProductResponse';

export default async function searchProducts({
  q,
  page = 0,
}: {
  q: string;
  page?: number;
}) {
  const { data } = await axios.get<ProductResponse>(
    `/products/search?q=${q}&size=10&page=${page}`,
  );
  return data;
}
