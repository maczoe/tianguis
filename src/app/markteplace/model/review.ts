export interface Review {
  id: number;
  timestamp: Date;
  comment: string;
  rating: number;
  authorId: number;
  profileId?: number;
  productId?: number;
  transactionId?: number;
}
