import axios from '@axios/index';

import { ProductResponse } from '@customTypes/ProductResponse';

export default async function getProductsByPlace({
  place,
  page = 0,
}: {
  place: string;
  page?: number;
}) {
  const { data } = await axios.get<ProductResponse>(
    `/products/place/${place}?size=10&page=${page}`,
  );
  return data;
}
