import productRepository from "../repositories/product/productRepository";
import { parseRequest } from "../utils/controllerUtils";
import { createProductSchema, deleteProductSchema, getProductSchema, getProductsSchema, updateProductSchema } from "../validationSchemas/productValidationSchemas";
import { Request, Response, query } from "express";

const createProduct = async (req: Request, res: Response) => {
    const request = await parseRequest(createProductSchema, req, res);
    if (request === null) {
        return;
    }

    const product = request.body;

    const newProductResult = await productRepository.create(product);
    if (newProductResult.isErr) {
        return handleControllerErrors(newProductResult.error, res);
    }

    res.status(201).send(newProductResult.value);
};


const getProduct = async (req: Request, res: Response) => {
    const request = await parseRequest(getProductSchema, req, res);

    if (request === null) {
        return;
    }

    const id = request.params.id;

    const productResult = await productRepository.read(id);
    if (productResult.isErr) {
        return handleControllerErrors(productResult.error, res);
    }

    res.status(200).send(productResult.value);
};

const getProducts = async (req: Request, res: Response) => {
    const request = await parseRequest(getProductsSchema, req, res);

    if (request === null ) {
        return;
    }

    const { page, ...filter } = request.query;

    const productsResult = await productRepository.readMany(page, filter);
    if (productsResult.isErr) {
        return handleControllerErrors(productsResult.error, res);
    }

    res.status(200).send(productsResult.value);
};

const updateProduct = async (req: Request, res: Response) => {
    const request = await parseRequest(updateProductSchema, req, res);

    if (request === null) {
        return;
    }

    const product = { id: request.params.id, ...request.body };

    const updatedProductResult = await productRepository.update(product);
    if (updatedProductResult.isErr) {
        return handleControllerErrors(updatedProductResult.error, res);
    }

    res.status(200).send(updatedProductResult.value);
};

const deleteProduct = async (req: Request, res: Response) => {
    const request = await parseRequest(deleteProductSchema, req, res);

    if (request === null) {
        return;
    }

    const id = request.params.id;

    const deletedProductResult = await productRepository.delete(id);
    if (deletedProductResult.isErr) {
        return handleControllerErrors(deletedProductResult.error, res);
    }

    res.status(200).send({});
};

export const categoryController = {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct,
};
