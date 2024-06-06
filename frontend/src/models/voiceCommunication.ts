import {BaseModelId} from "./base.ts";
import {UserInfoDto} from "./user.ts";
import {CustomerDto} from "./customer.ts";

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