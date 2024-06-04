import {Request, Response} from "express";
import {handleControllerErrors, parseRequest} from "../utils/controllerUtils";
import {
    createChatCommunicationRequestSchema, deleteChatCommunicationRequestSchema,
    getChatCommunicationRequestSchema, getChatCommunicationsRequestSchema,
    updateChatCommunicationRequestSchema
} from "../validationSchemas/chatCommunicationValidationSchemas";
import { chatCommunicationRepository } from "../repositories/communication/communicationRepository";

const createChatCommunication = async (req: Request, res: Response) => {
    const request = await parseRequest(createChatCommunicationRequestSchema, req, res);
    if (request === null) return;

    const chatCommunicationData = request.body;

    const newChatCommunication = await chatCommunicationRepository.create(chatCommunicationData);

    if (newChatCommunication.isErr) {
        handleControllerErrors(newChatCommunication.error, res);
        return;
    }

    // 201 == created, no content
    res.status(201).send(newChatCommunication.value);
};

const getChatCommunication = async (req: Request, res: Response) => {
    const request = await parseRequest(getChatCommunicationRequestSchema, req, res);
    if (request === null) return;

    const chatCommunicationId = request.params.id;

    const chatCommunication = await chatCommunicationRepository.readOneExtended(chatCommunicationId);
    if (chatCommunication.isErr) {
        handleControllerErrors(chatCommunication.error, res);
        return;
    }

    res.status(200).send(chatCommunication.value);
};

const updateChatCommunication = async (req: Request, res: Response) => {
    const request = await parseRequest(updateChatCommunicationRequestSchema, req, res);
    if (request === null) return;

    const chatCommunicationId = request.params.id;
    const chatCommunicationData = request.body;

    const updatedChatCommunication = await chatCommunicationRepository.update(chatCommunicationId, chatCommunicationData);
    if (updatedChatCommunication.isErr) {
        handleControllerErrors(updatedChatCommunication.error, res);
        return;
    }

    // 200 == OK, has content
    res.status(200).send(updatedChatCommunication.value);
};

const deleteChatCommunication = async (req: Request, res: Response) => {
    const request = await parseRequest(deleteChatCommunicationRequestSchema, req, res);
    if (request === null) return;

    const chatCommunicationId = request.params.id;

    const deleted = await chatCommunicationRepository.delete(chatCommunicationId);
    if (deleted.isErr) {
        handleControllerErrors(deleted.error, res);
        return;
    }

    res.status(204).send();
};

const getChatCommunications = async (req: Request, res: Response) => {
    const request = await parseRequest(getChatCommunicationsRequestSchema, req, res);
    if (request === null) return;

    const {cursor, ...filter} = request.query;

    const chatCommunications = await chatCommunicationRepository.readMany(cursor, filter);
    if (chatCommunications.isErr) {
        handleControllerErrors(chatCommunications.error, res);
        return;
    }

    res.status(200).send(chatCommunications.value);
};

export const chatCommunicationController = {
    createChatCommunication,
    getChatCommunication,
    updateChatCommunication,
    deleteChatCommunication,
    getChatCommunications
}