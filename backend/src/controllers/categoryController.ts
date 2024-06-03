import { Request, Response, query } from "express";
import { handleControllerErrors, parseRequest } from "../utils/controllerUtils";
import { createCategorySchema, deleteCategorySchema, getCategoriesSchema, getCategorySchema, updateCategorySchema } from "../validationSchemas/categoryValidationSchemas";
import categoryRepository from "../repositories/category/categoryRepository";

const createCategory = async (req: Request, res: Response) => {
    const request = await parseRequest(createCategorySchema, req, res);
    if (request === null) {
        return;
    }

    const category = request.body;

    const newCategoryResult = await categoryRepository.create(category);
    if (newCategoryResult.isErr) {
        return handleControllerErrors(newCategoryResult.error, res);
    }

    res.status(201).send(newCategoryResult.value);
};


const getCategory = async (req: Request, res: Response) => {
    const request = await parseRequest(getCategorySchema, req, res);

    if (request === null) {
        return;
    }

    const id = request.params.id;

    const categoryResult = await categoryRepository.read(id);
    if (categoryResult.isErr) {
        return handleControllerErrors(categoryResult.error, res);
    }

    res.status(200).send(categoryResult.value);
};

const getCategories = async (req: Request, res: Response) => {
    const request = await parseRequest(getCategoriesSchema, req, res);

    if (request === null ) {
        return;
    }

    const { page, ...filter } = request.query;

    const categoriesResult = await categoryRepository.readMany(page, filter);
    if (categoriesResult.isErr) {
        return handleControllerErrors(categoriesResult.error, res);
    }

    res.status(200).send(categoriesResult.value);
};

const updateCategory = async (req: Request, res: Response) => {
    const request = await parseRequest(updateCategorySchema, req, res);

    if (request === null) {
        return;
    }

    const category = { id: request.params.id, name: request.body.name };

    const updatedCategoryResult = await categoryRepository.update(category);
    if (updatedCategoryResult.isErr) {
        return handleControllerErrors(updatedCategoryResult.error, res);
    }

    res.status(200).send(updatedCategoryResult.value);
};

const deleteCategory = async (req: Request, res: Response) => {
    const request = await parseRequest(deleteCategorySchema, req, res);

    if (request === null) {
        return;
    }

    const id = request.params.id;

    const deletedCategoryResult = await categoryRepository.delete(id);
    if (deletedCategoryResult.isErr) {
        return handleControllerErrors(deletedCategoryResult.error, res);
    }

    res.status(200).send({});
};

export const categoryController = {
    createCategory,
    getCategory,
    getCategories,
    updateCategory,
    deleteCategory,
};
