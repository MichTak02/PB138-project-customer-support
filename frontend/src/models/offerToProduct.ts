import {BaseModelId} from "./base.ts";
import {ProductExtendedDto} from "./product.ts";


export type OfferToProductDto = BaseModelId & {
    offerId: number,
    productId: number,
    productQuantity: number,
    newPrice: number
}

export type OfferToProductCreateDto = Omit<OfferToProductDto, "id">
export type OfferToProductUpdateDto = Partial<OfferToProductCreateDto>

export type OfferToProductExtendedDto = Omit<OfferToProductDto, "productId"> & {
    product: ProductExtendedDto,
}

export type OfferToProductFilters = Partial<OfferToProductCreateDto>