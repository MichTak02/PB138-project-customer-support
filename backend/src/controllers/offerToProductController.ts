import { Request, Response } from "express";
import offerToProductRepository from "../repositories/offerToProduct/offerToProductRepository";
import {handleControllerErrors, parseRequest} from "../utils/controllerUtils";
import { createOfferToProductRequestSchema, deleteOfferToProductRequestSchema, getOfferToProductRequestSchema, getOffersToProductsRequestSchema, updateOfferToProductRequestSchema } from "../validationSchemas/offerToProductValidationSchemas";

const createOfferToProduct = async (req: Request, res: Response) => {
    const request = await parseRequest(createOfferToProductRequestSchema, req, res);
    if (request === null) {
        return;
    }
    const offerToProduct = request.body;

    const newOfferToProductResult = await offerToProductRepository.create(offerToProduct);
    if (newOfferToProductResult.isErr) {
        return handleControllerErrors(newOfferToProductResult.error, res);
    }

    res.status(201).send(newOfferToProductResult.value);
};


const getOfferToProduct = async (req: Request, res: Response) => {
    const request = await parseRequest(getOfferToProductRequestSchema, req, res);

    if (request === null) {
        return;
    }

    const id = request.params.id;

    const offerToProductResult = await offerToProductRepository.read(id);
    if (offerToProductResult.isErr) {
        return handleControllerErrors(offerToProductResult.error, res);
    }

    res.status(200).send(offerToProductResult.value);
};

const getOffersToProducts = async (req: Request, res: Response) => {
    const request = await parseRequest(getOffersToProductsRequestSchema, req, res);

    if (request === null ) {
        return;
    }

    const { page, ...filter } = request.query;

    const offerToProductsResult = await offerToProductRepository.readMany(page, filter);
    if (offerToProductsResult.isErr) {
        return handleControllerErrors(offerToProductsResult.error, res);
    }

    res.status(200).send(offerToProductsResult.value);
};

const updateOfferToProduct = async (req: Request, res: Response) => {
    const request = await parseRequest(updateOfferToProductRequestSchema, req, res);

    if (request === null) {
        return;
    }

    const offerToProduct = request.body;

    const updatedOfferToProductResult = await offerToProductRepository.update(request.params.id, offerToProduct);
    if (updatedOfferToProductResult.isErr) {
        return handleControllerErrors(updatedOfferToProductResult.error, res);
    }

    res.status(200).send(updatedOfferToProductResult.value);
};

const deleteOfferToProduct = async (req: Request, res: Response) => {
    const request = await parseRequest(deleteOfferToProductRequestSchema, req, res);

    if (request === null) {
        return;
    }

    const id = request.params.id;

    const deletedOfferToProductResult = await offerToProductRepository.delete(id);
    if (deletedOfferToProductResult.isErr) {
        return handleControllerErrors(deletedOfferToProductResult.error, res);
    }

    res.status(200).send(deletedOfferToProductResult.value);
};

export const offerToProductController = {
    createOfferToProduct,
    getOfferToProduct,
    getOffersToProducts,
    updateOfferToProduct,
    deleteOfferToProduct,
};