export interface Category {
  id: number;
  name: string;
  image?: string;
}

export interface ResponseCategories {
  categories: Category[];
  totalItems: number;
  currentPage: number;
  pageSize: number;
}
