import { Offer, OfferToProduct } from "@prisma/client";
import { OfferDto, OfferExtendedDto, OfferToProductDto, OfferToProductExtendedDto, OfferToProductWithProduct, OfferWithOfferToProductWithProducts, OfferWithOfferToProducts } from "./types";
import { productModelToProductDto, productModelToProductExtendedDto } from "../product/mappers";

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

export const offerModelToOfferDto = (model: OfferWithOfferToProducts): OfferDto => ({
    id: model.id,
    description: model.description,
    name: model.name,
    offerToProducts: model.offerToProducts.map((otp) => offerToProductModelToOfferToProductDto(otp)),
})

export const offerModelToOfferExtendedDto = (model: OfferWithOfferToProductWithProducts): OfferExtendedDto => ({
    id: model.id,
    name: model.name,
    description: model.description,
    offerToProducts: model.offerToProducts.map((otp) => offerToProductModelToOfferToProductExtendedDto(otp)),
})