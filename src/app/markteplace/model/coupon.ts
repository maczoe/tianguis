import { CouponsCategory } from './couponsCategory';

export interface Profile {
    id?: string;
    name?: string;
    description?: string;
    image?: string;
    expired?: string;
    category?: CouponsCategory;
    locationIds?: string[];
  }
