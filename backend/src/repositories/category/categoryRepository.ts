import {Result} from "@badrap/result";
import prisma from "../client";
import {CategoryCreateDto, CategoryDto, CategoryFilters, CategoryUpdateDto} from "./types";
import {categoryModelToCategoryDto} from "./mappers";
import {DbResult} from "../types";
import {handleRepositoryErrors, READ_MANY_TAKE} from "../../utils/repositoryUtils";
import {ConflictError} from "../../errors/errors";
import {Prisma} from "@prisma/client";

const categoryRepository = {
    async create(data: CategoryCreateDto): DbResult<CategoryDto> {
        try {
            const category = await prisma.category.create({data});
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

    async readMany(cursorId: number | undefined, filterValues: CategoryFilters): DbResult<CategoryDto[]> {
        const filter: Prisma.CategoryWhereInput = {
            AND: [
                {name: {contains: filterValues.name, mode: 'insensitive'}},
                {id: {equals: filterValues.id}},
            ],
        }

        try {
            if (!cursorId) {
                const categories = await prisma.category.findMany({
                    take: READ_MANY_TAKE,
                    orderBy: {id: 'asc'},
                    where: filter
                });
                return Result.ok(categories.map(category => categoryModelToCategoryDto(category)));
            }
            const categories = await prisma.category.findMany({
                skip: 1,
                cursor: {id: cursorId},
                take: READ_MANY_TAKE,
                orderBy: {id: 'asc'},
                where: filter,
            });

            return Result.ok(categories.map(category => categoryModelToCategoryDto(category)));
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    async update(id: number, data: CategoryUpdateDto): DbResult<CategoryDto> {
        try {
            const category = await prisma.category.update({
                where: {
                    id: id,
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

    async delete(id: number): DbResult<CategoryDto> {
        try {
            const transactionResult = await prisma.$transaction(
                async (transaction) => {
                    const category = await transaction.category.findUniqueOrThrow({
                        where: {
                            id,
                        },
                        include: {
                            products: true,
                        },
                    });
                    if (category.products.length != 0) {
                        throw new ConflictError("Cannot delete category as it is used by some products");
                    }
                    const deletedCategory = await transaction.category.delete({
                        where: {id},
                    });
                    return deletedCategory;
                }
            )
            return Result.ok(transactionResult);
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },
}

export default categoryRepository;
