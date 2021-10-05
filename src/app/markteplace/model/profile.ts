enum ProfileType {
  buyer = 'BUYER',
  seller = 'SELLER',
  employee = 'EMPLOYEE'
}



export interface Profile {
  id?: number;
  name?: string;
  description?: string;
  phone?: string;
  publicEmail?: string;
  website?: string;
  address?: string;
  photo?: string;
  rating?: number;
  type?: ProfileType;
  sales?: number;
  products?: number;
  verified?: boolean;
  locationIds?: number[];
  favorite?: boolean;
}
