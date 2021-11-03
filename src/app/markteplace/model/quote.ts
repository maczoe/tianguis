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

export interface Product {
  id?: string;
  title?: string;
  description?: string;
  price?: number;
  expiration: string;
  minPrice?: number;
  maxPrice?: number;
  locationId: string;
  attachments?: number;
  type: QuoteTyoe;
  status: QuoteStatus;
  paymentTerms?: string;
  author: number;
  active: boolean;
}
