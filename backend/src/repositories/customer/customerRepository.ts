import {Result} from "@badrap/result";
import {DbResult} from "../types";
import {CustomerCreateDto, CustomerDto, CustomerExtendedDto, CustomerFilters, CustomerUpdateDto} from "./types";
import prisma from "../client";
import {handleRepositoryErrors, READ_MANY_TAKE} from "../../utils/repositoryUtils";
import {customerModelToCustomerDto, customerModelToCustomerExtendedDto} from "./mappers";

export const customerRepository = {
    async create (data: CustomerCreateDto): DbResult<CustomerDto> {
        try {
            const customer = await prisma.customer.create({
                data: {
                    email: data.email,
                    name: data.name,
                    surname: data.surname,
                    phoneNumber: data.phoneNumber,
                    products: {
                        connect : data.productIds.map(id => ({ id }))
                    },
                },
            });

            return Result.ok(customerModelToCustomerDto(customer));
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    async update(id: number, data: CustomerUpdateDto): DbResult<CustomerDto> {
        try {
            const updatedCustomer = await prisma.customer.update({
                where: {
                    id: id,
                },
                data: {
                    email: data.email,
                    name: data.name,
                    surname: data.surname,
                    phoneNumber: data.phoneNumber,
                    products: {
                        set: data.productIds ? data.productIds.map(id => ({ id })) : undefined,
                    },
                },
            });

            return Result.ok(customerModelToCustomerDto(updatedCustomer));
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    async delete(id: number): DbResult<CustomerDto> {
        try {
            const result = await prisma.customer.delete({
                where : {
                    id: id
                }
            })

            return Result.ok(customerModelToCustomerDto(result));
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    async readOne(id: number): DbResult<CustomerDto> {
        try {
            const customer = await prisma.customer.findFirstOrThrow({
                where : {
                    id: id
                }
            });
            return Result.ok(customerModelToCustomerDto(customer));
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    async readManyEmails(productIds: number[]) {
        try {
            const customers = await prisma.customer.findMany({
                where: {
                    id: {
                        in: productIds
                    }
                }
            })
            return Result.ok(customers.map(customer => customer.email));
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    async readOneExtended(id: number): DbResult<CustomerExtendedDto> {
        try {
            const customer = await prisma.customer.findFirstOrThrow({
                where : {
                    id: id
                },
                include: {
                    chatCommunications: true,
                    voiceCommunications: true,
                    products: {
                        include: {
                            categories: true,
                        }
                    }
                }
            });
            return Result.ok(customerModelToCustomerExtendedDto(customer));
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    async readMany(cursorId: number | undefined, filter?: CustomerFilters): DbResult<CustomerDto[]> {
        try {
            if (!cursorId) {
                const customers = await prisma.customer.findMany({
                    take: READ_MANY_TAKE,
                    orderBy: { id: 'asc' },
                    where: filter
                });

                return Result.ok(customers.map(u => customerModelToCustomerDto(u)));
            }

            const customers = await prisma.customer.findMany({
                take: READ_MANY_TAKE,
                skip: 1,
                cursor: { id: cursorId },
                orderBy: { id: 'asc' },
                where: filter
            });
            return Result.ok(customers.map(u => customerModelToCustomerDto(u)));
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    async readManyExtended(cursorId: number | undefined, filter?: CustomerFilters): DbResult<CustomerExtendedDto[]> {
        try {
            const includeObj = {
                chatCommunications: true,
                voiceCommunications: true,
                products: {
                    include: {
                        categories: true,
                    }
                }
            }

            if (!cursorId) {
                const customers = await prisma.customer.findMany({
                    take: READ_MANY_TAKE,
                    orderBy: { id: 'asc' },
                    include: includeObj,
                    where: filter
                });

                return Result.ok(customers.map(u => customerModelToCustomerExtendedDto(u)));
            }

            const customers = await prisma.customer.findMany({
                take: READ_MANY_TAKE,
                skip: 1,
                cursor: { id: cursorId },
                orderBy: { id: 'asc' },
                include: includeObj,
                where: filter
            });
            return Result.ok(customers.map(u => customerModelToCustomerExtendedDto(u)));
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },


}

export default customerRepository;