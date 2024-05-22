import { Result } from "@badrap/result";
import prisma from "../client";
import { CategoryCreateDto, CategoryDto, CategoryFilters, CategoryUpdateDto } from "./types";
import { categoryModelToCategoryDto } from "./mappers";
import { DbResult } from "../types";
import { handleRepositoryErrors } from "../../utils/repositoryUtils";

const CATEGORIES_PER_PAGE = 20;

const categoryRepository = {
    async create(data: CategoryCreateDto): DbResult<CategoryDto> {
        try {
            const category = await prisma.category.create({ data });
            return Result.ok(categoryModelToCategoryDto(category))
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    async read(id: number): DbResult<CategoryDto> {
        try {
            const category = await prisma.category.findUniqueOrThrow({
                where: {
                    id,
                },
            });
            return Result.ok(categoryModelToCategoryDto(category));
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    async readMany(cursorId: number | undefined, filter: CategoryFilters): DbResult<CategoryDto[]> {
        try {
            if (!cursorId) {
                const categories = await prisma.category.findMany({
                    take: CATEGORIES_PER_PAGE,
                    orderBy: { id: 'asc'},
                    where: filter,
                });
                return Result.ok(categories.map(category => categoryModelToCategoryDto(category)));
            }
            const categories = await prisma.category.findMany({
                skip: 1,
                cursor: { id: cursorId },
                take: CATEGORIES_PER_PAGE,
                orderBy: { id: 'asc'},
                where: filter,
            });

            return Result.ok(categories.map(category => categoryModelToCategoryDto(category)));
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    async update(data: CategoryUpdateDto): DbResult<CategoryDto> {
        try {
            const category = await prisma.category.update({
                where: {
                    id: data.id,
                },
                data: {
                    name: data.name,
                },
            });
            return Result.ok(categoryModelToCategoryDto(category));
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    async delete(id: number): DbResult<void> {
        try {
            const transactionResult = await prisma.$transaction(
                async (transaction) => {
                    const category = transaction.category.findUniqueOrThrow({
                        where: {
                            id,
                        },
                        include: {
                            products: true,
                        },
                    });
                    if (category.products.length != 0) {
                        throw new Error("Cannot delete category as it is used by some products");
                    }
                    transaction.category.delete({
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

export default categoryRepository;
