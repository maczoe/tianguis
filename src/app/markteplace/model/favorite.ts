import { Product } from './product';

export interface FavoriteProducts {
  id: number;
  product: Product;
  createdAt?: string;
  updatedAt?: string;
}
