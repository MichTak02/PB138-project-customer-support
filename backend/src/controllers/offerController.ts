import { Request, Response } from "express";
import offerRepository from "../repositories/offer/offerRepository";
import {handleControllerErrors, parseRequest} from "../utils/controllerUtils";
import { createOfferSchema, deleteOfferSchema, getOfferSchema, getOffersSchema, updateOfferSchema } from "../validationSchemas/offerValidationSchemas";
import { Resend } from "resend";
import customerRepository from "../repositories/customer/customerRepository";

const resend = new Resend('re_MasW7uBH_2aNeKDfRghgD3pkDQkTyMGZx');

const createOffer = async (req: Request, res: Response) => {
    const request = await parseRequest(createOfferSchema, req, res);
    if (request === null) {
        return;
    }

    const offer = request.body;

    const newOfferResult = await offerRepository.create(offer);
    if (newOfferResult.isErr) {
        return handleControllerErrors(newOfferResult.error, res);
    }
    
    const offerResult = await offerRepository.read(newOfferResult.value.id);
    if (offerResult.isErr) {
        return handleControllerErrors(offerResult.error, res);
    }

    const subject = "New Offer";
    const body = `
        Dear customer,

        A new offer has been created with name: ${offerResult.value.name}!

        Come check it out!

        Best Regards,
        Customer Support Team
        `;
    const emails = await customerRepository.readManyEmails(offerResult.value.offerToProducts.map(otp => otp.product.id));
    if (emails.isErr) {
        return handleControllerErrors(emails.error, res);
    }

    const testAddressTo = ["trost.proj@gmail.com"];
    await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: testAddressTo.length === 0 ? emails.value : testAddressTo,
        subject: subject,
        text: body,
    });
    
    res.status(201).send(newOfferResult.value);
};


const getOffer = async (req: Request, res: Response) => {
    const request = await parseRequest(getOfferSchema, req, res);

    if (request === null) {
        return;
    }

    const id = request.params.id;

    const offerResult = await offerRepository.read(id);
    if (offerResult.isErr) {
        return handleControllerErrors(offerResult.error, res);
    }
    offerResult.value.offerToProducts.map(otp => otp.product.id)
    res.status(200).send(offerResult.value);
};

const getOffers = async (req: Request, res: Response) => {
    const request = await parseRequest(getOffersSchema, req, res);

    if (request === null ) {
        return;
    }

    const { cursor, ...filter } = request.query;

    const offersResult = await offerRepository.readMany(cursor, filter);
    if (offersResult.isErr) {
        return handleControllerErrors(offersResult.error, res);
    }

    res.status(200).send(offersResult.value);
};

const updateOffer = async (req: Request, res: Response) => {
    const request = await parseRequest(updateOfferSchema, req, res);

    if (request === null) {
        return;
    }

    const offer = request.body;

    const updatedOfferResult = await offerRepository.update(request.params.id, offer);
    if (updatedOfferResult.isErr) {
        return handleControllerErrors(updatedOfferResult.error, res);
    }

    res.status(200).send(updatedOfferResult.value);
};

const deleteOffer = async (req: Request, res: Response) => {
    const request = await parseRequest(deleteOfferSchema, req, res);

    if (request === null) {
        return;
    }

    const id = request.params.id;

    const deletedOfferResult = await offerRepository.delete(id);
    if (deletedOfferResult.isErr) {
        return handleControllerErrors(deletedOfferResult.error, res);
    }

    res.status(200).send(deletedOfferResult.value);
};

export const offerController = {
    createOffer,
    getOffer,
    getOffers,
    updateOffer,
    deleteOffer,
};