import { Category } from "./category";

export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    type: string;
    categories: Category[];
  };
  
  export type ProductBasic = Omit<Product, 'id' | 'categories'>;