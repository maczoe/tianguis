import { Profile } from './profile';

enum ResponseStatus {
  won = 'WON',
  lost = 'LOST',
  aborted = 'ABORTED',
  pending = 'PENDING',
}

export interface ResponseQuote {
  id?: string;
  comment?: string;
  price?: number;
  attachments?: number;
  product?: string;
  expiration?: string;
  terms?: string;
  requests?: string;
  author?: Profile;
  status?: ResponseStatus;
  active?: boolean;
  createdAt?: string;
}
