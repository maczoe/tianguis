import { Message } from './message';
import { Profile } from './profile';

export interface Chat {
  _id?: string;
  sender?: number;
  receiver?: number;
  product?: number;
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
