import {BaseModelId} from "./base.ts";
import {UserInfoDto} from "./user.ts";
import {CustomerDto} from "./customer.ts";

export type ChatCommunicationDto = BaseModelId & {
    message:                string
    timestamp:              Date
    isUserSent:             boolean
    customerId: number
    userId: number
};
export type ChatCommunicationCreateDto = Omit<ChatCommunicationDto, "id" | "timestamp">
    & {
    customerId: number
    userId: number
};
export type ChatCommunicationUpdateDto = Partial<ChatCommunicationCreateDto & {timestamp: string}>
export type ChatCommunicationExtendedDto = Omit<ChatCommunicationDto, "userId" | "customerId"> & {
    user:                   UserInfoDto
    customer:               CustomerDto
}
export type ChatCommunicationFilters = Partial<ChatCommunicationCreateDto>