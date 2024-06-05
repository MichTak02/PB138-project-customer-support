import {Offer} from "@prisma/client";
import { OfferDto, OfferExtendedDto } from "./types";
import {offerToProductModelToOfferToProductExtendedDto, OfferToProductWithProduct} from "../offerToProduct/mappers";

export type OfferWithOfferToProductWithProducts = Offer & {
    offerToProducts: OfferToProductWithProduct[],
}

export const offerModelToOfferDto = (model: Offer): OfferDto => ({
    id: model.id,
    description: model.description,
    name: model.name,
})

export const offerModelToOfferExtendedDto = (model: OfferWithOfferToProductWithProducts): OfferExtendedDto => ({
    id: model.id,
    name: model.name,
    description: model.description,
    offerToProducts: model.offerToProducts.map((otp) => offerToProductModelToOfferToProductExtendedDto(otp)),
})