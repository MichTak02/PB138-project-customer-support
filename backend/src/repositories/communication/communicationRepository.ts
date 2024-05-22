import {Result} from "@badrap/result";
import {DbResult} from "../types";
import {
    ChatCommunicationCreateDto,
    ChatCommunicationDto,
    ChatCommunicationExtendedDto,
    ChatCommunicationFilters,
    ChatCommunicationUpdateDto, VoiceCommunicationCreateDto, VoiceCommunicationDto,
    VoiceCommunicationExtendedDto, VoiceCommunicationFilters, VoiceCommunicationUpdateDto
} from "./types";
import prisma from "../client";
import {handleRepositoryErrors, READ_MANY_TAKE} from "../../utils/repositoryUtils";
import {
    chatCommunicationModelToChatCommunicationDto,
    chatCommunicationModelToChatCommunicationExtendedDto, voiceCommunicationModelToVoiceCommunicationDto,
    voiceCommunicationModelToVoiceCommunicationExtendedDto
} from "./mappers";

export const chatCommunicationRepository = {
    async create (data: ChatCommunicationCreateDto): DbResult<ChatCommunicationDto> {
        try {
            const chatCommunication = await prisma.chatCommunication.create({
                data: {
                    message: data.message,
                    timestamp: data.timestamp,
                    isUserSent: data.isUserSent,
                    user: {
                        connect: {
                            id: data.userId,
                        },
                    },
                    customer: {
                        connect: {
                            id: data.customerId,
                        },
                    },
                },
            });

            return Result.ok(chatCommunicationModelToChatCommunicationDto(chatCommunication));
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    async update(id: number, data: ChatCommunicationUpdateDto): DbResult<ChatCommunicationDto> {
        try {
            const updatedChatCommunication = await prisma.chatCommunication.update({
                data: {
                    message: data.message,
                    timestamp: data.timestamp,
                    isUserSent: data.isUserSent,
                    user: {
                        connect: {
                            id: data.userId,
                        },
                    },
                    customer: {
                        connect: {
                            id: data.customerId,
                        },
                    },
                },
                where : {
                    id: id
                }
            });
            return Result.ok(chatCommunicationModelToChatCommunicationDto(updatedChatCommunication));
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    async delete(id: number): DbResult<ChatCommunicationDto> {
        try {
            const result = await prisma.chatCommunication.delete({
                where : {
                    id: id
                }
            })

            return Result.ok(chatCommunicationModelToChatCommunicationDto(result));
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },
    async readOne(id: number): DbResult<ChatCommunicationDto> {
        try {
            const chatCommunication = await prisma.chatCommunication.findFirstOrThrow({
                where : {
                    id: id
                }
            });
            return Result.ok(chatCommunicationModelToChatCommunicationDto(chatCommunication));
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    async readOneExtended(id: number): DbResult<ChatCommunicationExtendedDto> {
        try {
            const chatCommunication = await prisma.chatCommunication.findFirstOrThrow({
                where : {
                    id: id
                },
                include: {
                    user: true,
                    customer: true,
                }
            });
            return Result.ok(chatCommunicationModelToChatCommunicationExtendedDto(chatCommunication));
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    async readMany(cursorId: number | undefined, filter?: ChatCommunicationFilters): DbResult<ChatCommunicationDto[]> {
        try {
            if (!cursorId) {
                const users = await prisma.chatCommunication.findMany({
                    take: READ_MANY_TAKE,
                    orderBy: { id: 'asc' },
                    where: filter
                });

                return Result.ok(users.map(u => chatCommunicationModelToChatCommunicationDto(u)));
            }

            const users = await prisma.chatCommunication.findMany({
                take: READ_MANY_TAKE,
                skip: 1,
                cursor: { id: cursorId },
                orderBy: { id: 'asc' },
                where: filter
            });
            return Result.ok(users.map(u => chatCommunicationModelToChatCommunicationDto(u)));
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    async readManyExtended(cursorId: number | undefined, filter?: ChatCommunicationFilters): DbResult<ChatCommunicationExtendedDto[]> {
        try {
            const includeObj = {
                user: true,
                customer: true,
            }

            if (!cursorId) {
                const users = await prisma.chatCommunication.findMany({
                    take: READ_MANY_TAKE,
                    orderBy: { id: 'asc' },
                    include: includeObj,
                    where: filter
                });

                return Result.ok(users.map(u => chatCommunicationModelToChatCommunicationExtendedDto(u)));
            }

            const users = await prisma.chatCommunication.findMany({
                take: READ_MANY_TAKE,
                skip: 1,
                cursor: { id: cursorId },
                orderBy: { id: 'asc' },
                include: includeObj,
                where: filter
            });
            return Result.ok(users.map(u => chatCommunicationModelToChatCommunicationExtendedDto(u)));
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },
}

export const voiceCommunicationRepository = {
    async create (data: VoiceCommunicationCreateDto): DbResult<VoiceCommunicationDto> {
        try {
            const voiceCommunication = await prisma.voiceCommunication.create({ data });
            return Result.ok(voiceCommunicationModelToVoiceCommunicationDto(voiceCommunication));
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    async update(id: number, data: VoiceCommunicationUpdateDto): DbResult<VoiceCommunicationDto> {
        try {
            const updatedVoiceCommunication = await prisma.voiceCommunication.update({
                data: data,
                where : {
                    id: id
                }
            });
            return Result.ok(voiceCommunicationModelToVoiceCommunicationDto(updatedVoiceCommunication));
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    async delete(id: number): DbResult<VoiceCommunicationDto> {
        try {
            const result = await prisma.voiceCommunication.delete({
                where : {
                    id: id
                }
            })

            return Result.ok(voiceCommunicationModelToVoiceCommunicationDto(result));
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },
    async readOne(id: number): DbResult<VoiceCommunicationDto> {
        try {
            const voiceCommunication = await prisma.voiceCommunication.findFirstOrThrow({
                where : {
                    id: id
                }
            });
            return Result.ok(voiceCommunicationModelToVoiceCommunicationDto(voiceCommunication));
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    async readOneExtended(id: number): DbResult<VoiceCommunicationExtendedDto> {
        try {
            const voiceCommunication = await prisma.voiceCommunication.findFirstOrThrow({
                where : {
                    id: id
                },
                include: {
                    user: true,
                    customer: true,
                }
            });
            return Result.ok(voiceCommunicationModelToVoiceCommunicationExtendedDto(voiceCommunication));
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    async readMany(cursorId: number | undefined, filter?: VoiceCommunicationFilters): DbResult<VoiceCommunicationDto[]> {
        try {
            if (!cursorId) {
                const users = await prisma.voiceCommunication.findMany({
                    take: READ_MANY_TAKE,
                    orderBy: { id: 'asc' },
                    where: filter
                });

                return Result.ok(users.map(u => voiceCommunicationModelToVoiceCommunicationDto(u)));
            }

            const users = await prisma.voiceCommunication.findMany({
                take: READ_MANY_TAKE,
                skip: 1,
                cursor: { id: cursorId },
                orderBy: { id: 'asc' },
                where: filter
            });
            return Result.ok(users.map(u => voiceCommunicationModelToVoiceCommunicationDto(u)));
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    async readManyExtended(cursorId: number | undefined, filter?: VoiceCommunicationFilters): DbResult<VoiceCommunicationExtendedDto[]> {
        try {
            const includeObj = {
                user: true,
                customer: true,
            }

            if (!cursorId) {
                const users = await prisma.voiceCommunication.findMany({
                    take: READ_MANY_TAKE,
                    orderBy: { id: 'asc' },
                    include: includeObj,
                    where: filter
                });

                return Result.ok(users.map(u => voiceCommunicationModelToVoiceCommunicationExtendedDto(u)));
            }

            const users = await prisma.voiceCommunication.findMany({
                take: READ_MANY_TAKE,
                skip: 1,
                cursor: { id: cursorId },
                orderBy: { id: 'asc' },
                include: includeObj,
                where: filter
            });
            return Result.ok(users.map(u => voiceCommunicationModelToVoiceCommunicationExtendedDto(u)));
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },
};