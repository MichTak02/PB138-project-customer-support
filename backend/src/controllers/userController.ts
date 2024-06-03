import {Request, Response} from "express";
import {handleControllerErrors, parseRequest} from "../utils/controllerUtils";
import {
    createUserRequestSchema, deleteUserRequestSchema,
    getUserRequestSchema, getUsersRequestSchema,
    updateUserRequestSchema
} from "../validationSchemas/userValidationSchemas";
import userRepository from "../repositories/user/userRepository";
import {createPasswordHash} from "../utils/userUtils";

const createUser = async (req: Request, res: Response) => {
    const request = await parseRequest(createUserRequestSchema, req, res);
    if (request === null) return;

    const userData = request.body;
    const passwordHash = await createPasswordHash(userData.password)

    const newUser = await userRepository.create({...userData, passwordHash: passwordHash});
    if (newUser.isErr) {
        handleControllerErrors(newUser.error, res);
        return;
    }

    // 201 == created, no content
    res.status(201).send(newUser.value);
};

const getUser = async (req: Request, res: Response) => {
    const request = await parseRequest(getUserRequestSchema, req, res);
    if (request === null) return;

    const userId = request.params.id;

    const user = await userRepository.readOneExtended(userId);
    if (user.isErr) {
        handleControllerErrors(user.error, res);
        return;
    }

    res.status(200).send(user.value);
};

const updateUser = async (req: Request, res: Response) => {
    const request = await parseRequest(updateUserRequestSchema, req, res);
    if (request === null) return;

    const userId = request.params.id;
    const userData = request.body;

    const updatedUser = await userRepository.update(userId, userData);
    if (updatedUser.isErr) {
        handleControllerErrors(updatedUser.error, res);
        return;
    }

    // 200 == OK, has content
    res.status(200).send(updatedUser.value);
};

const deleteUser = async (req: Request, res: Response) => {
    const request = await parseRequest(deleteUserRequestSchema, req, res);
    if (request === null) return;

    const userId = request.params.id;

    const deleted = await userRepository.delete(userId);
    if (deleted.isErr) {
        handleControllerErrors(deleted.error, res);
        return;
    }

    res.status(204).send();
};

const getUsers = async (req: Request, res: Response) => {
    const request = await parseRequest(getUsersRequestSchema, req, res);
    if (request === null) return;

    const {cursor, ...filter} = request.query;

    const users = await userRepository.readMany(cursor, filter);
    if (users.isErr) {
        handleControllerErrors(users.error, res);
        return;
    }

    res.status(200).send(users.value);
};

export const userController = {
    createUser,
    getUser,
    updateUser,
    deleteUser,
    getUsers
}