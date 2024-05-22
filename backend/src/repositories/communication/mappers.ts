import {ChatCommunication, Customer, User, VoiceCommunication} from "@prisma/client";
import {
    ChatCommunicationDto,
    ChatCommunicationExtendedDto,
    VoiceCommunicationDto,
    VoiceCommunicationExtendedDto
} from "./types";
import {userModelToUserDto} from "../user/mappers";
import {customerModelToCustomerDto} from  "../customer/mappers"

export const chatCommunicationModelToChatCommunicationDto = (chatCommunicationModel: ChatCommunication):
    ChatCommunicationDto => ({
    id: chatCommunicationModel.id,
    message: chatCommunicationModel.message,
    timestamp: chatCommunicationModel.timestamp,
    isUserSent: chatCommunicationModel.isUserSent,
});

export const chatCommunicationModelToChatCommunicationExtendedDto = (chatCommunicationModel: ChatCommunication & {
    user: User
    customer: Customer
}): ChatCommunicationExtendedDto => ({
    id: chatCommunicationModel.id,
    message: chatCommunicationModel.message,
    timestamp: chatCommunicationModel.timestamp,
    isUserSent: chatCommunicationModel.isUserSent,
    user: userModelToUserDto(chatCommunicationModel.user),
    customer: customerModelToCustomerDto(chatCommunicationModel.customer)
});

export const voiceCommunicationModelToVoiceCommunicationDto = (voiceCommunicationModel: VoiceCommunication):
    VoiceCommunicationDto => ({
    id: voiceCommunicationModel.id,
    filePath: voiceCommunicationModel.filePath,
    start: voiceCommunicationModel.start,
    end: voiceCommunicationModel.end,
    isUserStarted: voiceCommunicationModel.isUserStarted
});

export const voiceCommunicationModelToVoiceCommunicationExtendedDto = (voiceCommunicationModel: VoiceCommunication & {
    user: User
    customer: Customer
}):
    VoiceCommunicationExtendedDto => ({
    id: voiceCommunicationModel.id,
    filePath: voiceCommunicationModel.filePath,
    start: voiceCommunicationModel.start,
    end: voiceCommunicationModel.end,
    isUserStarted: voiceCommunicationModel.isUserStarted,
    user: userModelToUserDto(voiceCommunicationModel.user),
    customer: customerModelToCustomerDto(voiceCommunicationModel.customer)
});