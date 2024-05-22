import {BaseModelId} from "../types";
import {UserDto} from "../user/types";

export type ChatCommunicationDto = BaseModelId & {
    message:                string
    timestamp:              Date
    isUserSent:             boolean
    user:                   UserDto
    customer:               CustomerDto
}

export type ChatCommunicationCreateDto = Omit<ChatCommunicationDto, "id" | "user" | "customer">
    & {
    customerId: number
    userId: number
};
export type ChatCommunicationUpdateDto = Partial<ChatCommunicationCreateDto>

export type VoiceCommunicationDto = BaseModelId & {
    filePath:               string
    start:                  Date
    end:                    Date
    isUserStarted:          boolean
    user:                   UserDto
    customer:               CustomerDto
}

export type VoiceCommunicationCreateDto = Omit<VoiceCommunicationDto, "id" | "user" | "customer">
    & {
    customerId: number
    userId: number
};

export type VoiceCommunicationUpdateDto = Partial<VoiceCommunicationCreateDto>