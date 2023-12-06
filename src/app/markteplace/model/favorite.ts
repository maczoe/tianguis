import { Product } from './product';
import { Profile } from './profile';

export interface FavoriteProducts {
  id: number;
  product: Product;
  createdAt?: string;
  updatedAt?: string;
}

export interface FavoriteProfiles {
  id: number;
  profile: Profile;
  createdAt?: string;
  updatedAt?: string;
}
