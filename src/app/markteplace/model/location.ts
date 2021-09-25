export interface Location {
  id: number;
  address: string;
  lat?: number;
  lng?: number;
  city?: string;
  state?: string;
  country: string;
}
