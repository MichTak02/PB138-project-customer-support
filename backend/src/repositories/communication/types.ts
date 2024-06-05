import {BaseModelId} from "../types";
import {UserInfoDto} from "../user/types";
import {CustomerDto} from "../customer/types";

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



export type VoiceCommunicationDto = BaseModelId & {
    start:                  Date
    end:                    Date
    isUserStarted:          boolean
    customerId: number
    userId: number
}

export type VoiceCommunicationCreateDto = Omit<VoiceCommunicationDto, "id">
    & {
    filePath: string
    customerId: number
    userId: number
};

export type VoiceCommunicationUpdateDto = Partial<VoiceCommunicationCreateDto>
export type VoiceCommunicationExtendedDto = Omit<VoiceCommunicationDto, "userId" | "customerId"> & {
    user:                   UserInfoDto
    customer:               CustomerDto
}
export type VoiceCommunicationFilters = Partial<Omit<VoiceCommunicationCreateDto, "filePath">>