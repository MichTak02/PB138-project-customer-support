import { Result } from "@badrap/result";
import prisma from "../client";
import { DbResult } from "../types";
import { OfferToProductCreateDto, OfferToProductDto, OfferToProductExtendedDto, OfferToProductFilter, OfferToProductUpdateDto } from "./types";
import {handleRepositoryErrors, READ_MANY_TAKE} from "../../utils/repositoryUtils";
import {offerToProductModelToOfferToProductDto, offerToProductModelToOfferToProductExtendedDto} from "./mappers";

const offerToProductRepository = {
    async create(data: OfferToProductCreateDto): DbResult<OfferToProductDto> {
        try {
            const offerToProductDto = await prisma.offerToProduct.create({data});
            return Result.ok(offerToProductModelToOfferToProductDto(offerToProductDto));
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    async read(id: number): DbResult<OfferToProductExtendedDto> {
        try {
            const offerToProduct = await prisma.offerToProduct.findUniqueOrThrow({
                where: {
                    id: id
                },
                include: {
                    product: {
                        include: {
                            categories: true
                        }
                    }
                }
            });
            return Result.ok(offerToProductModelToOfferToProductExtendedDto(offerToProduct));
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    async readMany(cursorId: number | undefined, filter: OfferToProductFilter) : DbResult<OfferToProductExtendedDto[]> {
        const includeObj = {
            product: {
                include: {
                    categories: true
                }
            }
        }

        try {
            if (!cursorId) {
                const offerToProducts = await prisma.offerToProduct.findMany({
                    take: READ_MANY_TAKE,
                    orderBy: { id: 'asc'},
                    where: filter,
                    include: includeObj
                });
                return Result.ok(offerToProducts.map(offerToProduct => offerToProductModelToOfferToProductExtendedDto(offerToProduct)));
            }
            const offerToProducts = await prisma.offerToProduct.findMany({
                skip: 1,
                cursor: { id: cursorId },
                take: READ_MANY_TAKE,
                orderBy: { id: 'asc'},
                where: filter,
                include: includeObj
            });
            return Result.ok(offerToProducts.map(offerToProduct => offerToProductModelToOfferToProductExtendedDto(offerToProduct)));
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    async update(id: number, data: OfferToProductUpdateDto): DbResult<OfferToProductDto> {
        try {
            const offerToProduct = await prisma.offerToProduct.update({
                where: {
                    id: id
                },
                data: data,
            });
            return Result.ok(offerToProductModelToOfferToProductDto(offerToProduct));
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    async delete(id: number): DbResult<OfferToProductDto> {
        try {
            const deletedOfferToProduct = await prisma.offerToProduct.delete({
                where: {
                    id: id
                },
            });

            return Result.ok(offerToProductModelToOfferToProductDto(deletedOfferToProduct));
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    }
}

export default offerToProductRepository;
