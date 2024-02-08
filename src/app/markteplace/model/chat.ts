import { Message } from './message';
import { Product } from './product';
import { Profile } from './profile';

export interface Chat {
  _id?: string;
  sender?: number;
  receiver?: number;
  product?: Product;
  type?: string;
  createdAt?: string;
  activated?: boolean;
  profile?: Profile;
  messages?: Message[];
}

export interface ResponseMessages {
  page: number;
  messages: Message[];
}
