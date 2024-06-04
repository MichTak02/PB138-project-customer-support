import {Request, Response} from "express";
import {handleControllerErrors, parseRequest} from "../utils/controllerUtils";
import {
    createCustomerRequestSchema, deleteCustomerRequestSchema,
    getCustomerRequestSchema, getCustomersRequestSchema,
    updateCustomerRequestSchema
} from "../validationSchemas/customerValidationSchemas";
import customerRepository from "../repositories/customer/customerRepository";

const createCustomer = async (req: Request, res: Response) => {
    const request = await parseRequest(createCustomerRequestSchema, req, res);
    if (request === null) return;

    const customerData = request.body;

    const newCustomer = await customerRepository.create(customerData);
    if (newCustomer.isErr) {
        handleControllerErrors(newCustomer.error, res);
        return;
    }

    // 201 == created, no content
    res.status(201).send(newCustomer.value);
};

const getCustomer = async (req: Request, res: Response) => {
    const request = await parseRequest(getCustomerRequestSchema, req, res);
    if (request === null) return;

    const customerId = request.params.id;

    const customer = await customerRepository.readOneExtended(customerId);
    if (customer.isErr) {
        handleControllerErrors(customer.error, res);
        return;
    }

    res.status(200).send(customer.value);
};

const updateCustomer = async (req: Request, res: Response) => {
    const request = await parseRequest(updateCustomerRequestSchema, req, res);
    if (request === null) return;

    const customerId = request.params.id;
    const customerData = request.body;

    const updatedCustomer = await customerRepository.update(customerId, customerData);
    if (updatedCustomer.isErr) {
        handleControllerErrors(updatedCustomer.error, res);
        return;
    }

    // 200 == OK, has content
    res.status(200).send(updatedCustomer.value);
};

const deleteCustomer = async (req: Request, res: Response) => {
    const request = await parseRequest(deleteCustomerRequestSchema, req, res);
    if (request === null) return;

    const customerId = request.params.id;

    const deleted = await customerRepository.delete(customerId);
    if (deleted.isErr) {
        handleControllerErrors(deleted.error, res);
        return;
    }

    res.status(204).send();
};

const getCustomers = async (req: Request, res: Response) => {
    const request = await parseRequest(getCustomersRequestSchema, req, res);
    if (request === null) return;

    const {cursor, ...filter} = request.query;

    const customers = await customerRepository.readMany(cursor, filter);
    if (customers.isErr) {
        handleControllerErrors(customers.error, res);
        return;
    }

    res.status(200).send(customers.value);
};

export const customerController = {
    createCustomer,
    getCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomers
}