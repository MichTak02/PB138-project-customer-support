import {BaseModelId} from "./base.ts";
import {ChatCommunicationDto} from "./chatCommunication.ts";
import {VoiceCommunicationDto} from "./voiceCommunication.ts";

export type Role = "REGULAR" | "ADMIN";
export enum RoleValues {
    REGULAR = "REGULAR",
    ADMIN = "ADMIN"
}

export type UserDto = BaseModelId & {
    email:        string
    displayName:  string
    createdOn:    Date
    role:         Role
    password: string
}

export type UserInfoDto = Omit<UserDto, "role" | "passwordHash" | "createdOn">

export type UserCreateDto = Omit<UserDto, "id" | "createdOn">;
export type UserUpdateDto = Partial<Omit<UserCreateDto, "email">>
export type UserExtendedDto = UserDto & {
    chatCommunications:    ChatCommunicationDto[]
    voiceCommunications:   VoiceCommunicationDto[]
}

export type UserFilters = Partial<Omit<UserCreateDto, "passwordHash">>