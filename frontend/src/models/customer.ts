import {BaseModelId} from "./base.ts";
import {ProductDto} from "./product.ts";
import {ChatCommunicationDto} from "./chatCommunication.ts";
import {VoiceCommunicationDto} from "./voiceCommunication.ts";

export type CustomerDto = BaseModelId & {
    name:     string
    surname:     string
    email:        string
    phoneNumber: string
}

export type CustomerCreateDto = Omit<CustomerDto, "id"> & { productIds: number[] };
export type CustomerUpdateDto = Partial<CustomerCreateDto>
export type CustomerExtendedDto = CustomerDto & {
    products:            ProductDto[]
    chatCommunications:  ChatCommunicationDto[]
    voiceCommunications: VoiceCommunicationDto[]
}

export type CustomerFilters = Partial<CustomerCreateDto & { id: number}>

  