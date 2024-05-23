import { Offer, OfferToProduct } from "@prisma/client"
import { ProductExtendedDto, ProductWithCategories } from "../product/types"
import { BaseModelId } from "../types"

export type OfferToProductWithProduct = OfferToProduct & {
    product: ProductWithCategories,
}

export type OfferWithOfferToProducts = Offer & {
    offerToProducts: OfferToProduct[]
}

export type OfferWithOfferToProductWithProducts = Offer & {
    offerToProducts: OfferToProductWithProduct[],
}

export type OfferToProductDto = BaseModelId & {
    offerId: number,
    productId: number,
    productQuantity: number,
    newPrice: number
}

export type OfferToProductExtendedDto = Omit<OfferToProductDto, "productId"> & {
    product: ProductExtendedDto,
}

export type OfferDto = BaseModelId & {
    name: string,
    description: string,
    offerToProducts: OfferToProductDto[]
}

export type OfferCreateDto = Omit<OfferDto, "id">;
export type OfferUpdateDto = Partial<OfferDto>

export type OfferExtendedDto = Omit<OfferDto, "offerToProducts"> & {
    offerToProducts: OfferToProductExtendedDto[],
}

export type OfferFilter = Partial<Omit<OfferCreateDto, "offerToProducts">>;
