import {BaseModelId} from "../types";
import {ChatCommunicationDto, VoiceCommunicationDto} from "../communication/types";
import {Role as PrismaRole} from "@prisma/client";

export type Role = PrismaRole

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