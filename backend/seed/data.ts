import { faker } from '@faker-js/faker';
import { RoleValues } from '../src/repositories/user/types'
import {TypeValues} from "../src/repositories/product/types";
import {createPasswordHash} from "../src/utils/userUtils";

export const ENTRY_COUNT = 10;

export const userData = createPasswordHash("1234").then((h) => {
    return Array.from({length: ENTRY_COUNT}).map(() => ({
        id: faker.number.int({min: 0, max: 1000000}),
        email: faker.internet.email(),
        displayName: faker.internet.userName(),
        passwordHash: h,
        createdOn: faker.date.past(),
        role: faker.number.int(100) > 70 ? RoleValues.ADMIN : RoleValues.REGULAR,
    }));
} );

export const customerData = Array.from({length: ENTRY_COUNT}).map(() => ({
    id: faker.number.int({min: 0, max: 1000000}),
    name: faker.person.firstName(),
    surname: faker.person.lastName(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.number(),
}));

export const productData = Array.from({length: ENTRY_COUNT}).map(() => ({
    id: faker.number.int({min: 0, max: 1000000}),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.number.int({min: 50, max: 50000}),
    type: faker.number.int(1) ? TypeValues.PRODUCT : TypeValues.SERVICE
}));

export const categoryData = Array.from({length: ENTRY_COUNT}).map(() => ({
    id: faker.number.int({min: 0, max: 1000000}),
    name: faker.company.buzzNoun(),
}));

export const offerData = Array.from({length: ENTRY_COUNT}).map(() => ({
    id: faker.number.int({min: 0, max: 1000000}),
    name: faker.company.buzzPhrase(),
    description: faker.company.catchPhrase(),
}));

export const offerToProductData = Array.from({length: ENTRY_COUNT}).map(() => ({
    id: faker.number.int({min: 0, max: 1000000}),
    productQuantity: faker.number.int({min: 1, max: 50}),
    newPrice: faker.number.int({min: 1, max: 20000}),
    offerId: -1,
    productId: -1,
}));

export const chatCommunicationData = Array.from({length: ENTRY_COUNT}).map(() => ({
    id: faker.number.int({min: 0, max: 1000000}),
    message: faker.word.words({ count: { min: 5, max: 50 } }),
    timestamp: faker.date.past(),
    isUserSent: !!faker.number.int({min: 0, max: 1}),
    userId: -1,
    customerId: -1,
}));

export const voiceCommunicationData = Array.from({length: ENTRY_COUNT}).map(() => ({
    id: faker.number.int({min: 0, max: 1000000}),
    filePath: faker.internet.url(),
    start: faker.date.past(),
    end: faker.date.past(),
    isUserStarted: !!faker.number.int({min: 0, max: 1}),
    userId: -1,
    customerId: -1,
}));
