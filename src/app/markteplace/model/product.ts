import { Category } from './category';
import { Profile } from './profile';

enum ProductStatus {
  new = 'NEW',
  used = 'USED',
  openBox = 'OPEN BOX',
}

enum ProductType {
  product = 'PRODUCT',
  service = 'SERVICE',
}

export interface Product {
  id?: number;
  name?: string;
  description?: string;
  status?: ProductStatus;
  type?: ProductType;
  terms?: string;
  paymentTerms?: string;
  oldPrice?: number;
  price?: number;
  minPrice?: number;
  maxPrice?: number;
  warranty?: number;
  profileId?: number;
  images?: string[];
  imagesUrl?: string;
  rating?: number;
  categoriesIds?: number[];
  categories?: Category[];
  favorite?: boolean;
  profile?: Profile;
  reviews?: [];
  createAt?: string;
  updateAt?: string;
  activated?: boolean;
}

export interface ResponseProducts {
  products?: Product[];
  totalItems?: number;
  currentPage?: string;
  pageSize?: string;
}
