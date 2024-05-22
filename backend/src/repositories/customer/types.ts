import {BaseModelId} from "../types";
import {ChatCommunicationDto, VoiceCommunicationDto} from "../communication/types";

export type CustomerDto = BaseModelId & {
    name:     string
    surname:     string
    email:        string
    phoneNumber: string
}

export type CustomerCreateDto = Omit<CustomerDto, "id">;
export type CustomerUpdateDto = Partial<CustomerCreateDto>
export type CustomerExtendedDto = CustomerDto & {
    products:            ProductDto[]
    chatCommunications:  ChatCommunicationDto[]
    voiceCommunications: VoiceCommunicationDto[]
}