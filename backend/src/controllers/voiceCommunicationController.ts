import {Request, Response} from "express";
import {handleControllerErrors, parseRequest} from "../utils/controllerUtils";
import {
    createVoiceCommunicationRequestSchema, deleteVoiceCommunicationRequestSchema,
    getVoiceCommunicationRequestSchema, getVoiceCommunicationsRequestSchema,
    updateVoiceCommunicationRequestSchema
} from "../validationSchemas/voiceCommunicationValidationSchemas";
import { voiceCommunicationRepository } from "../repositories/communication/communicationRepository";

const createVoiceCommunication = async (req: Request, res: Response) => {
    const request = await parseRequest(createVoiceCommunicationRequestSchema, req, res);
    if (request === null) return;
    if (!req.file) {
        res.status(400).send('No file uploaded.');
        return;
    }
    const voiceCommunicationData = request.body;

    const newVoiceCommunication = await voiceCommunicationRepository.create({
        start: voiceCommunicationData.start,
        end: voiceCommunicationData.end,
        isUserStarted: voiceCommunicationData.isUserStarted,
        userId: voiceCommunicationData.userId,
        customerId: voiceCommunicationData.customerId,
        filePath: req.file.path,
    });

    if (newVoiceCommunication.isErr) {
        handleControllerErrors(newVoiceCommunication.error, res);
        return;
    }

    // 201 == created, no content
    res.status(201).send(newVoiceCommunication.value);
};

const getVoiceCommunication = async (req: Request, res: Response) => {
    const request = await parseRequest(getVoiceCommunicationRequestSchema, req, res);
    if (request === null) return;

    const voiceCommunicationId = request.params.id;

    const voiceCommunication = await voiceCommunicationRepository.readOneExtended(voiceCommunicationId);
    if (voiceCommunication.isErr) {
        handleControllerErrors(voiceCommunication.error, res);
        return;
    }

    res.status(200).send(voiceCommunication.value);
};

const updateVoiceCommunication = async (req: Request, res: Response) => {
    const request = await parseRequest(updateVoiceCommunicationRequestSchema, req, res);
    if (request === null) return;

    const voiceCommunicationId = request.params.id;
    const voiceCommunicationData = request.body;

    const updatedVoiceCommunication = await voiceCommunicationRepository.update(voiceCommunicationId, voiceCommunicationData);
    if (updatedVoiceCommunication.isErr) {
        handleControllerErrors(updatedVoiceCommunication.error, res);
        return;
    }

    // 200 == OK, has content
    res.status(200).send(updatedVoiceCommunication.value);
};

const deleteVoiceCommunication = async (req: Request, res: Response) => {
    const request = await parseRequest(deleteVoiceCommunicationRequestSchema, req, res);
    if (request === null) return;

    const voiceCommunicationId = request.params.id;

    const deleted = await voiceCommunicationRepository.delete(voiceCommunicationId);
    if (deleted.isErr) {
        handleControllerErrors(deleted.error, res);
        return;
    }

    res.status(204).send();
};

const getVoiceCommunications = async (req: Request, res: Response) => {
    const request = await parseRequest(getVoiceCommunicationsRequestSchema, req, res);
    if (request === null) return;

    const {cursor, ...filter} = request.query;

    const voiceCommunications = await voiceCommunicationRepository.readMany(cursor, filter);
    if (voiceCommunications.isErr) {
        handleControllerErrors(voiceCommunications.error, res);
        return;
    }

    res.status(200).send(voiceCommunications.value);
};

export const voiceCommunicationController = {
    createVoiceCommunication,
    getVoiceCommunication,
    updateVoiceCommunication,
    deleteVoiceCommunication,
    getVoiceCommunications
}