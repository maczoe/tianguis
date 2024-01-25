import { Profile } from './profile';

export enum ResponseStatus {
  won = 'WON',
  lost = 'LOST',
  aborted = 'ABORTED',
  pending = 'PENDING',
  aproved = 'APROVED',
}

export interface ResponseQuote {
  id?: string;
  comment?: string;
  price?: number;
  attachments?: string;
  authorId?: string;
  product?: string;
  expiration?: string;
  terms?: string;
  requests?: string;
  requestsId?: string;
  author?: Profile;
  status?: ResponseStatus;
  active?: boolean;
  createdAt?: string;
}
