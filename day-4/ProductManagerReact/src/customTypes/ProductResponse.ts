import { Product } from './Product';

export interface ProductResponse {
  content: Product[];
  totalPages: number;
  number: number;
  empty: boolean;
  first: boolean;
  last: boolean;
}
