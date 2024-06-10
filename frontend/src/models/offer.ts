import { BaseModelId } from "./base.ts";
import { OfferToProductCreateDto, OfferToProductExtendedDto, OfferToProductUpdateDto } from "./offerToProduct.ts";

export type OfferDto = BaseModelId & {
  name: string,
  description: string,
};

export type OfferCreateDto = Omit<OfferDto, "id"> & { offerToProducts: Omit<OfferToProductCreateDto, "offerId">[] };
export type OfferUpdateDto = Partial<Omit<OfferDto, "id">> & { offerToProducts?: OfferToProductUpdateDto[] };

export type OfferExtendedDto = OfferDto & {
  offerToProducts: OfferToProductExtendedDto[],
};

export type OfferFilters = Partial<Omit<OfferCreateDto, "offerToProducts"> & { productIds: number[] }>;
