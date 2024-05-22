import {ChatCommunication, User, VoiceCommunication} from "@prisma/client";
import {UserDto, UserExtendedDto} from "./types"
import {
    chatCommunicationModelToChatCommunicationDto,
    voiceCommunicationModelToVoiceCommunicationDto
} from "../communication/mappers";

export const userModelToUserDto = (userModel: User): UserDto => ({
    id: userModel.id,
    email: userModel.email,
    displayName: userModel.displayName,
    passwordHash: userModel.passwordHash,
    createdOn: userModel.createdOn,
    role: userModel.role
});

export const userModelToUserExtendedDto = (userModel: User & {
    chatCommunications:    ChatCommunication[]
    voiceCommunications:   VoiceCommunication[]
}): UserExtendedDto => ({
    id: userModel.id,
    email: userModel.email,
    displayName: userModel.displayName,
    passwordHash: userModel.passwordHash,
    createdOn: userModel.createdOn,
    role: userModel.role,
    chatCommunications: userModel.chatCommunications.map(cc => chatCommunicationModelToChatCommunicationDto(cc)),
    voiceCommunications: userModel.voiceCommunications.map(vc => voiceCommunicationModelToVoiceCommunicationDto(vc)),
});