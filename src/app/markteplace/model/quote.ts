import { ResponseQuote } from './responseQuote';

enum QuoteTyoe {
  product = 'PRODUCT',
  service = 'SERVICE',
}

enum QuoteStatus {
  new = 'NEW',
  used = 'USED',
  openBox = 'OPEN BOX',
  refubished = 'REFUBISHED',
}

export interface Quote {
  id?: string;
  title?: string;
  description?: string;
  price?: number;
  expiration?: string;
  minPrice?: number;
  maxPrice?: number;
  locationId?: number;
  attachmentId?: number;
  type?: QuoteTyoe;
  status?: QuoteStatus;
  author?: number;
  active?: boolean;
  createdAt?: string;
  responses?: ResponseQuote[];
  categoriesIds?: number[];
}
