import {ChatCommunication, User, VoiceCommunication} from "@prisma/client";
import {UserDto, UserExtendedDto, UserInfoDto} from "./types"
import {
    chatCommunicationModelToChatCommunicationDto,
    voiceCommunicationModelToVoiceCommunicationDto
} from "../communication/mappers";

export const userModelToUserDto = (userModel: User): UserDto => ({
    id: userModel.id,
    email: userModel.email,
    displayName: userModel.displayName,
    createdOn: userModel.createdOn,
    role: userModel.role,
    passwordHash: userModel.passwordHash
});

export const userModelToUserInfoDto = (userModel: User): UserInfoDto => ({
    id: userModel.id,
    email: userModel.email,
    displayName: userModel.displayName,
});

export const userModelToUserExtendedDto = (userModel: User & {
    chatCommunications:    ChatCommunication[]
    voiceCommunications:   VoiceCommunication[]
}): UserExtendedDto => ({
    id: userModel.id,
    email: userModel.email,
    displayName: userModel.displayName,
    createdOn: userModel.createdOn,
    role: userModel.role,
    passwordHash: userModel.passwordHash,
    chatCommunications: userModel.chatCommunications.map(cc => chatCommunicationModelToChatCommunicationDto(cc)),
    voiceCommunications: userModel.voiceCommunications.map(vc => voiceCommunicationModelToVoiceCommunicationDto(vc)),
});