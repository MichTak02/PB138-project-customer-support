import {OfferToProduct} from "@prisma/client";
import {ProductWithCategories} from "../product/types";
import {OfferToProductDto, OfferToProductExtendedDto} from "./types";
import {productModelToProductExtendedDto} from "../product/mappers";

export type OfferToProductWithProduct = OfferToProduct & {
    product: ProductWithCategories,
}

export const offerToProductModelToOfferToProductDto = (model: OfferToProduct): OfferToProductDto => ({
    id: model.id,
    offerId: model.offerId,
    productId: model.productId,
    newPrice: model.newPrice,
    productQuantity: model.productQuantity
})

export const offerToProductModelToOfferToProductExtendedDto = (model: OfferToProductWithProduct): OfferToProductExtendedDto => ({
    id: model.id,
    offerId: model.offerId,
    product: productModelToProductExtendedDto(model.product),
    newPrice: model.newPrice,
    productQuantity: model.productQuantity,
})