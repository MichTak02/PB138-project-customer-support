import {BaseModelId} from "../types";
import {ChatCommunicationDto, VoiceCommunicationDto} from "../communication/types";

export type Role = "REGULAR" | "ADMIN";
export enum RoleValues {
    REGULAR = "REGULAR",
    ADMIN = "ADMIN"
}

export type UserDto = BaseModelId & {
    email:        string
    displayName:  string
    passwordHash: string
    createdOn:    Date
    role:         Role
}

export type UserCreateDto = Omit<UserDto, "id">;
export type UserUpdateDto = Partial<Omit<UserCreateDto, "createdOn">>
export type UserExtendedDto = UserDto & {
    chatCommunications:    ChatCommunicationDto[]
    voiceCommunications:   VoiceCommunicationDto[]
}

export type UserFilters = Partial<Omit<UserCreateDto, "passwordHash">>