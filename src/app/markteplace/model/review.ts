import { Profile } from './profile';

export interface Review {
  id?: number;
  createAt?: Date;
  content?: string;
  rating?: number;
  authorId?: number;
  profileId?: number;
  productId?: number;
  author?: Profile;
}

export interface ReviewsPage {
  reviews: Review[];
  totalItems: number;
  currentPage: number;
  pageSize: number;
}
