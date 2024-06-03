import {BaseModelId} from "../types";
import {UserDto} from "../user/types";
import {CustomerDto} from "../customer/types";

export type ChatCommunicationDto = BaseModelId & {
    message:                string
    timestamp:              Date
    isUserSent:             boolean
};
export type ChatCommunicationCreateDto = Omit<ChatCommunicationDto, "id" | "timestamp">
    & {
    customerId: number
    userId: number
};
export type ChatCommunicationUpdateDto = Partial<ChatCommunicationCreateDto>
export type ChatCommunicationExtendedDto = ChatCommunicationDto & {
    user:                   UserDto
    customer:               CustomerDto
}
export type ChatCommunicationFilters = Partial<ChatCommunicationCreateDto>



export type VoiceCommunicationDto = BaseModelId & {
    filePath:               string
    start:                  Date
    end:                    Date
    isUserStarted:          boolean
}

export type VoiceCommunicationCreateDto = Omit<VoiceCommunicationDto, "id">
    & {
    customerId: number
    userId: number
};

export type VoiceCommunicationUpdateDto = Partial<VoiceCommunicationCreateDto>
export type VoiceCommunicationExtendedDto = VoiceCommunicationDto & {
    user:                   UserDto
    customer:               CustomerDto
}
export type VoiceCommunicationFilters = Partial<VoiceCommunicationCreateDto>