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
