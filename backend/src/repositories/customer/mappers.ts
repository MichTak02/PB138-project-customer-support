import {ChatCommunication, Customer, Product, VoiceCommunication} from "@prisma/client";
import {CustomerDto, CustomerExtendedDto} from "./types";
import {
    chatCommunicationModelToChatCommunicationDto,
    voiceCommunicationModelToVoiceCommunicationDto
} from "../communication/mappers";

export const customerModelToCustomerDto = (customerModel: Customer): CustomerDto => ({
    id: customerModel.id,
    name: customerModel.name,
    surname: customerModel.surname,
    email: customerModel.email,
    phoneNumber: customerModel.phoneNumber,
})

export const customerModelToCustomerExtendedDto = (customerModel: Customer & {
    products: Product[],
    chatCommunications: ChatCommunication[],
    voiceCommunications: VoiceCommunication[]
}): CustomerExtendedDto => ({
    id: customerModel.id,
    name: customerModel.name,
    surname: customerModel.surname,
    email: customerModel.email,
    phoneNumber: customerModel.phoneNumber,
    products: customerModel.products.map(p => productModelToProductDto(p)),
    chatCommunications: customerModel.chatCommunications.map(cc => chatCommunicationModelToChatCommunicationDto(cc)),
    voiceCommunications: customerModel.voiceCommunications.map(vc => voiceCommunicationModelToVoiceCommunicationDto(vc)),
})