import {Result} from "@badrap/result";
import prisma from "../client";
import {DbResult} from "../types";
import {OfferCreateDto, OfferDto, OfferExtendedDto, OfferFilter, OfferUpdateDto} from "./types";
import {offerModelToOfferDto, offerModelToOfferExtendedDto} from "./mappers";
import {handleRepositoryErrors, READ_MANY_TAKE} from "../../utils/repositoryUtils";
import {Prisma} from "@prisma/client";
import { object } from "zod";

const offerRepository = {
    async create(data: OfferCreateDto): DbResult<OfferDto> {
        try {
            const transactionResult = await prisma.$transaction(
                async (transaction) => {
                    const {offerToProducts, ...offerData} = data;
                    const offer = await transaction.offer.create({
                        data: offerData,
                        include: {
                            offerToProducts: true,
                        },
                    });
                    for (const offerToProduct of offerToProducts) {
                        const otp = await transaction.offerToProduct.create({
                            data: {offerId: offer.id, ...offerToProduct},
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
                where: {id},
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

    async readMany(cursorId: number | undefined, filter: OfferFilter): DbResult<OfferExtendedDto[]> {
        const filterObj: Prisma.OfferWhereInput = {
            id: {equals: filter.id},
            name: {contains: filter.name, mode: 'insensitive'},
            description: {contains: filter.description, mode: 'insensitive'},
            offerToProducts: filter.productIds === undefined ? undefined : {
                some: {
                    productId: {
                        in: filter.productIds
                    }
                }
            }
        }

        const includeObj = {
            offerToProducts: {
                where: filter.productIds === undefined ? undefined : {
                    productId: {
                        in: filter.productIds
                    }
                },
                include: {
                    product: {
                        include: {
                            categories: true,
                        },
                    },
                },
            },
        }

        try {
            if (!cursorId) {
                const offers = await prisma.offer.findMany({
                    take: READ_MANY_TAKE,
                    orderBy: {id: 'asc'},
                    where: filterObj,
                    include: includeObj
                });
                return Result.ok(offers.map(offer => offerModelToOfferExtendedDto(offer)));
            }
            const offers = await prisma.offer.findMany({
                skip: 1,
                cursor: {id: cursorId},
                take: READ_MANY_TAKE,
                orderBy: {id: 'asc'},
                where: filterObj,
                include: includeObj
            });
            return Result.ok(offers.map(offer => offerModelToOfferExtendedDto(offer)));
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    async update(id: number, data: OfferUpdateDto): DbResult<OfferDto> {
        try {
            const transactionResult = await prisma.$transaction(
                async (transaction) => {
                    const {offerToProducts, ...offerData} = data;
                    await transaction.offerToProduct.deleteMany({
                        where: {
                            offerId: id,
                        },
                    });
                    const offer = await transaction.offer.update({
                        where: {
                            id: id,
                        },
                        data: offerData,
                        include: {
                            offerToProducts: true,
                        },
                    });
                    
                    if (offerToProducts) {
                        for (const offerToProduct of offerToProducts) {
                            const otp = await transaction.offerToProduct.create({
                                data: {offerId: id, ...offerToProduct},
                            });
                            offer.offerToProducts.push(otp);
                        }
                    }
                    return offer;
                },
                {
                    timeout: 100000,
                }
            )
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
                where: {id},
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
