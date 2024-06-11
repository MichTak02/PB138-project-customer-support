import {BaseModelId} from "../types";
import {ProductExtendedDto} from "../product/types";

export type OfferToProductDto = BaseModelId & {
    offerId: number,
    productId: number,
    productQuantity: number,
    newPrice: number
}

export type OfferToProductCreateDto = Omit<OfferToProductDto, "id">
export type OfferToProductUpdateDto = Omit<OfferToProductCreateDto, "offerId">

export type OfferToProductExtendedDto = Omit<OfferToProductDto, "productId"> & {
    product: ProductExtendedDto,
}

export type OfferToProductFilter = Partial<OfferToProductCreateDto>