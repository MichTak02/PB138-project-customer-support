import client from "../src/repositories/client";
import {faker} from '@faker-js/faker';
faker.seed(42);
import {
    userData, customerData, productData, categoryData, offerData,
    offerToProductData, chatCommunicationData, voiceCommunicationData, ENTRY_COUNT
} from "./data";

function getRandomValues<T>(arr: T[], n: number): T[] {
    let result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        let x = Math.floor(faker.number.float({min: 0, max: 1}) * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

const seed = async () => {
    console.log(`Start seeding ...`);

    for (let index = 0; index < ENTRY_COUNT; index++) {
        const [offerId] = getRandomValues(offerData.map(o => o.id), 1);
        const [productId] = getRandomValues(productData.map(p => p.id), 1);
        offerToProductData[index].offerId = offerId;
        offerToProductData[index].productId = productId;
    }

    for (let index = 0; index < ENTRY_COUNT; index++) {
        const [customerId] = getRandomValues(customerData.map(o => o.id), 1);
        const [userId] = getRandomValues(userData.map(p => p.id), 1);
        chatCommunicationData[index].customerId = customerId;
        chatCommunicationData[index].userId = userId;
    }

    for (let index = 0; index < ENTRY_COUNT; index++) {
        const [customerId] = getRandomValues(customerData.map(o => o.id), 1);
        const [userId] = getRandomValues(userData.map(p => p.id), 1);
        voiceCommunicationData[index].customerId = customerId;
        voiceCommunicationData[index].userId = userId;
    }

    await client.$transaction(async (tx) => {
        await tx.user.deleteMany();
        await tx.customer.deleteMany();
        await tx.category.deleteMany();
        await tx.offerToProduct.deleteMany();
        await tx.offer.deleteMany();
        await tx.product.deleteMany();
        await tx.chatCommunication.deleteMany();
        await tx.voiceCommunication.deleteMany();

        await tx.user.createMany({data: userData});
        await tx.customer.createMany({data: customerData});
        await tx.category.createMany({data: categoryData});
        await tx.offer.createMany({data: offerData});
        await tx.product.createMany({data: productData});
        await tx.offerToProduct.createMany({data: offerToProductData});
        await tx.chatCommunication.createMany({data: chatCommunicationData});
        await tx.voiceCommunication.createMany({data: voiceCommunicationData});

        // connect categories and products
        for (const p of productData) {
            const categoryIds = getRandomValues<{id: number}>(categoryData.map(c => ({ id: c.id })), faker.number.int({min:1,max:3}));
            await tx.product.update({
                where: {
                    id: p.id
                },
                data: {
                    categories: {
                        connect: categoryIds
                    }
                }
            });
        }

            // connect customer and products
        for (const c of customerData) {
            const productIds = getRandomValues<{id: number}>(productData.map(g => ({ id: g.id })), faker.number.int({min:1,max:5}));
            await tx.customer.update({
                where: {
                    id: c.id
                },
                data: {
                    products: {
                        connect: productIds
                    }
                }
            });
        }

    }, {
            timeout: 100000, // default: 5000
        }
    )

    console.log(`Seeding finished.`);
};

faker.seed(42);
seed()
    .then(async () => {
        await client.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await client.$disconnect();
    });