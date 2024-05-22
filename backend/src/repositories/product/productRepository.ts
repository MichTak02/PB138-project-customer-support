import { Result } from "@badrap/result";
import prisma from "../client";
import { DbResult } from "../types";
import { handleRepositoryErrors } from "../../utils/repositoryUtils";
import { ProductCreateDto, ProductDto, ProductExtendedDto, ProductFilters, ProductUpdateDto } from "./types";
import { productModelToProductDto, productModelToProductExtendedDto } from "./mappers";

const PRODUCTS_PER_PAGE = 20;

const productRepository = {
    async create(data: ProductCreateDto): DbResult<ProductDto> {
        try {
            const product = await prisma.product.create({
                data: data,
                include: {
                    categories: true,
                }
             });
            return Result.ok(productModelToProductDto(product))
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    async read(id: number): DbResult<ProductExtendedDto> {
        try {
            const product = await prisma.product.findUniqueOrThrow({
                where: {
                    id,
                },
                include: {
                    categories: true,
                },
            });
            return Result.ok(productModelToProductExtendedDto(product));
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    async readMany(cursorId: number | undefined, filter: ProductFilters): DbResult<ProductExtendedDto[]> {
        try {
            if (!cursorId) {
                const products = await prisma.product.findMany({
                    take: PRODUCTS_PER_PAGE,
                    orderBy: { id: 'asc'},
                    where: filter,
                    include: {
                        categories: true,
                    },
                });
                return Result.ok(products.map(product => productModelToProductExtendedDto(product)));
            }
            const products = await prisma.product.findMany({
                skip: 1,
                cursor: { id: cursorId },
                take: PRODUCTS_PER_PAGE,
                orderBy: { id: 'asc'},
                where: filter,
                include: {
                    categories: true,
                },
            });
            return Result.ok(products.map(product => productModelToProductExtendedDto(product)));
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    async update(data: ProductUpdateDto): DbResult<ProductDto> {
        try {
            const product = await prisma.product.update({
                where: {
                    id: data.id,
                },
                data: {
                    type: data.type,
                    price: data.price,
                    description: data.description,
                    categories: {
                        set: data.categoryIds ? data.categoryIds.map((id) => ({id})) : undefined,
                    },
                },
                include: {
                    categories: true,
                },
            });
            return Result.ok(productModelToProductDto(product));
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    async delete(id: number): DbResult<void> {
        try {
            const transactionResult = await prisma.$transaction(
                async (transaction) => {
                    const product = transaction.product.findUniqueOrThrow({
                        where: {
                            id,
                        },
                        include: {
                            offerToProducts: true,
                        },
                    });
                    if (product.offerToProducts.length != 0) {
                        throw new Error("Cannot delete product as it is used by some offers");
                    }
                    transaction.product.delete({
                        where: { id },
                    });
                    return;
                }   
            )
            return Result.ok(undefined);
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },
}

export default productRepository;