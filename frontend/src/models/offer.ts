import {BaseModelId} from "./base.ts";
import {OfferToProductCreateDto, OfferToProductExtendedDto} from "./offerToProduct.ts";

export type OfferDto = BaseModelId & {
  name: string,
  description: string,
}

export type OfferCreateDto = Omit<OfferDto, "id"> & { offerToProducts: Omit<OfferToProductCreateDto, "offerId">[] };
export type OfferUpdateDto = Partial<OfferDto>

export type OfferExtendedDto = OfferDto & {
  offerToProducts: OfferToProductExtendedDto[],
}

export type OfferFilter = Partial<Omit<OfferCreateDto, "offerToProducts">& { productIds: number[] }>;
