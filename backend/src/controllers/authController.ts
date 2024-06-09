import { Request, Response } from "express";
import {handleControllerErrors, parseRequest} from "../utils/controllerUtils";
import {registerRequestSchema} from "../validationSchemas/authValidationSchema";
import userRepository from "../repositories/user/userRepository";
import {createPasswordHash} from "../utils/userUtils";
import {RoleValues} from "../repositories/user/types";


const register = async (req: Request, res: Response) => {
    const request = await parseRequest(registerRequestSchema, req, res);
    if (request === null) {
        return;
    }

    const data = request.body

    const userExists = await userRepository.exists(data.email);
    if (userExists.isErr) {
        handleControllerErrors(userExists.error, res);
        return;
    }

    if (userExists.value) {
        res.status(400).send({ message: "User already exists" });
        return;
    }

    const hashedPassword = await createPasswordHash(data.password);
    const user = await userRepository.create({
        email: data.email,
        displayName: data.displayName,
        passwordHash: hashedPassword,
        role: RoleValues.REGULAR
    });

    if (user.isErr) {
        handleControllerErrors(user.error, res);
        return;
    }

    res.status(201).end();
};

const login = async (req: Request, res: Response) => {
    res.status(200).send({
        id: req.user?.id,
        email: req.user?.email,
        displayName: req.user?.displayName,
        role: req.user?.role
    });
};

export const authController = {
    register,
    login,
};