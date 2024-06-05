import { Product } from "./product";

  export type OfferToProduct = {
    id: number;
    offerId: number;
    product: Product;
    newPrice: number;
    productQuantity: number;
  };
  
  export type Offer = {
    id: number;
    name: string;
    description: string;
    offerToProducts: OfferToProduct[];
  };
  
  export type OfferBasic = Omit<Offer, 'id' | 'offerToProducts'>;
  