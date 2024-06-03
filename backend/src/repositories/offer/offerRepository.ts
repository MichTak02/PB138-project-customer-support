import { Result } from "@badrap/result";
import prisma from "../client";
import { DbResult } from "../types";
import { OfferCreateDto, OfferDto, OfferExtendedDto, OfferFilter, OfferUpdateDto } from "./types";
import { offerModelToOfferDto, offerModelToOfferExtendedDto, offerToProductModelToOfferToProductExtendedDto } from "./mappers";
import {handleRepositoryErrors, READ_MANY_TAKE} from "../../utils/repositoryUtils";

const offerRepository = {
    async create(data: OfferCreateDto): DbResult<OfferDto> {
        try {
            const transactionResult = await prisma.$transaction(
                async (transaction) => {
                    const { offerToProducts, ...offerData} = data;
                    const offer = await transaction.offer.create({
                        data: offerData,
                        include: {
                            offerToProducts: true,
                        },
                    });
                    for (const offerToProduct of offerToProducts) {
                        const otp = await transaction.offerToProduct.create({
                            data: offerToProduct,
                        });
                        offer.offerToProducts.push(otp);
                    }
                    return offer;
                }
            )
            return Result.ok(offerModelToOfferDto(transactionResult));
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    async read(id: number): DbResult<OfferExtendedDto> {
        try {
            const offer = await prisma.offer.findUniqueOrThrow({
                where: { id },
                include: {
                    offerToProducts: {
                        include: {
                            product: {
                                include: {
                                    categories: true,
                                },
                            },
                        },
                    },
                },
            });
            return Result.ok(offerModelToOfferExtendedDto(offer));
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    async readMany(cursorId: number | undefined, filter: OfferFilter) : DbResult<OfferExtendedDto[]> {
        try {
            if (!cursorId) {
                const offers = await prisma.offer.findMany({
                    take: READ_MANY_TAKE,
                    orderBy: { id: 'asc'},
                    where: filter,
                    include: {
                        offerToProducts: {
                            include: {
                                product: {
                                    include: {
                                        categories: true,
                                    },
                                },
                            },
                        },
                    },
                });
                return Result.ok(offers.map(offer => offerModelToOfferExtendedDto(offer)));
            }
            const offers = await prisma.offer.findMany({
                skip: 1,
                cursor: { id: cursorId },
                take: READ_MANY_TAKE,
                orderBy: { id: 'asc'},
                where: filter,
                include: {
                    offerToProducts: {
                        include: {
                            product: {
                                include: {
                                    categories: true,
                                },
                            },
                        },
                    },
                },
            });
            return Result.ok(offers.map(offer => offerModelToOfferExtendedDto(offer)));
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    async update(data: OfferUpdateDto): DbResult<OfferDto> {
        try {
            const transactionResult = await prisma.$transaction(
                async (transaction) => {
                    const { id, name, description, offerToProducts } = data;
                    if (offerToProducts) {
                        offerToProducts.map(async (otp) => {
                            const existing = await transaction.offerToProduct.findUnique({
                                where: { id: otp.id },
                            });

                            if (existing) {
                                await transaction.offerToProduct.update({
                                    where: {
                                        id: existing.id,
                                    },
                                    data: {
                                        productId: otp.productId,
                                        newPrice: otp.newPrice,
                                        productQuantity: otp.productQuantity,
                                    },
                                });
                            } else {
                                await transaction.offerToProduct.create({
                                    data: {
                                        offerId: otp.offerId,
                                        productId: otp.productId,
                                        productQuantity: otp.productQuantity,
                                        newPrice: otp.newPrice,
                                    },
                                });
                            }
                        });
                    };
                    const offer = transaction.offer.update({
                        where: { id },
                        data: {
                            name,
                            description,
                        },
                        include: {
                            offerToProducts: {
                                include: {
                                    product: {
                                        include: {
                                            categories: true,
                                        },
                                    },
                                },
                            },
                        },
                    });
                    return offer;
                });
            return Result.ok(offerModelToOfferDto(transactionResult));
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    async delete(id: number): DbResult<OfferDto> {
        try {
            const deleteOfferToProduct = prisma.offerToProduct.deleteMany({
                where: {
                    offerId: id
                }
            })

            const deleteOffer = prisma.offer.delete({
                where: { id },
                include: {
                    offerToProducts: true,
                },
            });

            const [_, deletedOffer] = await prisma.$transaction([deleteOfferToProduct, deleteOffer])

            return Result.ok(offerModelToOfferDto(deletedOffer));
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    }
}

export default offerRepository;
