import {ChatCommunication, Customer, User, VoiceCommunication} from "@prisma/client";
import {
    ChatCommunicationDto,
    ChatCommunicationExtendedDto,
    VoiceCommunicationDto,
    VoiceCommunicationExtendedDto
} from "./types";
import {userModelToUserInfoDto} from "../user/mappers";
import {customerModelToCustomerDto} from  "../customer/mappers"

export const chatCommunicationModelToChatCommunicationDto = (chatCommunicationModel: ChatCommunication & {userId: number, customerId: number}):
    ChatCommunicationDto => ({
    id: chatCommunicationModel.id,
    message: chatCommunicationModel.message,
    timestamp: chatCommunicationModel.timestamp,
    isUserSent: chatCommunicationModel.isUserSent,
    userId: chatCommunicationModel.userId,
    customerId: chatCommunicationModel.customerId
});

export const chatCommunicationModelToChatCommunicationExtendedDto = (chatCommunicationModel: ChatCommunication & {
    user: User
    customer: Customer
}): ChatCommunicationExtendedDto => ({
    id: chatCommunicationModel.id,
    message: chatCommunicationModel.message,
    timestamp: chatCommunicationModel.timestamp,
    isUserSent: chatCommunicationModel.isUserSent,
    user: userModelToUserInfoDto(chatCommunicationModel.user),
    customer: customerModelToCustomerDto(chatCommunicationModel.customer)
});

export const voiceCommunicationModelToVoiceCommunicationDto = (voiceCommunicationModel: VoiceCommunication & {userId: number, customerId: number}):
    VoiceCommunicationDto => ({
    id: voiceCommunicationModel.id,
    start: voiceCommunicationModel.start,
    end: voiceCommunicationModel.end,
    isUserStarted: voiceCommunicationModel.isUserStarted,
    userId: voiceCommunicationModel.userId,
    customerId: voiceCommunicationModel.customerId
});

export const voiceCommunicationModelToVoiceCommunicationExtendedDto = (voiceCommunicationModel: VoiceCommunication & {
    user: User
    customer: Customer
}):
    VoiceCommunicationExtendedDto => ({
    id: voiceCommunicationModel.id,
    start: voiceCommunicationModel.start,
    end: voiceCommunicationModel.end,
    isUserStarted: voiceCommunicationModel.isUserStarted,
    user: userModelToUserInfoDto(voiceCommunicationModel.user),
    customer: customerModelToCustomerDto(voiceCommunicationModel.customer)
});