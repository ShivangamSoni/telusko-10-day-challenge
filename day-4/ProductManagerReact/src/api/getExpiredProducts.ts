import axios from '@axios/index';

import { ProductResponse } from '@customTypes/ProductResponse';

export default async function getExpiredProducts({
  page = 0,
}: {
  page?: number;
}) {
  const { data } = await axios.get<ProductResponse>(
    `/products/expired?size=10&page=${page}`,
  );
  return data;
}
