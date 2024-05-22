import {Result} from "@badrap/result";
import {DbResult} from "../types";
import {UserCreateDto, UserDto, UserExtendedDto, UserFilters, UserUpdateDto} from "./types";
import prisma from "../client";
import {handleRepositoryErrors, READ_MANY_TAKE} from "../../utils/repositoryUtils";
import {userModelToUserDto, userModelToUserExtendedDto} from "./mappers";

export const userRepository = {
    async create (data: UserCreateDto): DbResult<UserDto> {
        try {
            const user = await prisma.user.create({ data });

            return Result.ok(userModelToUserDto(user));
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    async update(id: number, data: UserUpdateDto): DbResult<UserDto> {
        try {
            const updatedUser = await prisma.user.update({
                data: data,
                where : {
                    id: id
                }
            });
            return Result.ok(userModelToUserDto(updatedUser));
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    async delete(id: number): DbResult<UserDto> {
        try {
            const result = await prisma.user.delete({
                where : {
                    id: id
                }
            })

            return Result.ok(userModelToUserDto(result));
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    /**
     * Tries to authenticate the user by their email and password hash.
     * @param email
     * @param passwordHash
     *
     * @return User ID if successful
     */
    async login(email: string, passwordHash: string): DbResult<number> {
        try {
            const idObj = await prisma.user.findFirstOrThrow({
                select: {
                    id: true
                },
                where : {
                    email: email,
                    passwordHash: passwordHash
                }
            });
            return Result.ok(idObj.id);
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    async readOne(id: number): DbResult<UserDto> {
        try {
            const user = await prisma.user.findFirstOrThrow({
                where : {
                    id: id
                }
            });
            return Result.ok(userModelToUserDto(user));
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    async readOneExtended(id: number): DbResult<UserExtendedDto> {
        try {
            const user = await prisma.user.findFirstOrThrow({
                where : {
                    id: id
                },
                include: {
                    chatCommunications: true,
                    voiceCommunications: true,
                }
            });
            return Result.ok(userModelToUserExtendedDto(user));
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    async readMany(cursorId: number | undefined, filter?: UserFilters): DbResult<UserDto[]> {
        try {
            if (!cursorId) {
                const users = await prisma.user.findMany({
                    take: READ_MANY_TAKE,
                    orderBy: { id: 'asc' },
                    where: filter
                });

                return Result.ok(users.map(u => userModelToUserDto(u)));
            }

            const users = await prisma.user.findMany({
                take: READ_MANY_TAKE,
                skip: 1,
                cursor: { id: cursorId },
                orderBy: { id: 'asc' },
                where: filter
            });
            return Result.ok(users.map(u => userModelToUserDto(u)));
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    async readManyExtended(cursorId: number | undefined, filter?: UserFilters): DbResult<UserExtendedDto[]> {
        try {
            const includeObj = {
                chatCommunications: true,
                voiceCommunications: true,
            }

            if (!cursorId) {
                const users = await prisma.user.findMany({
                    take: READ_MANY_TAKE,
                    orderBy: { id: 'asc' },
                    include: includeObj,
                    where: filter
                });

                return Result.ok(users.map(u => userModelToUserExtendedDto(u)));
            }

            const users = await prisma.user.findMany({
                take: READ_MANY_TAKE,
                skip: 1,
                cursor: { id: cursorId },
                orderBy: { id: 'asc' },
                include: includeObj,
                where: filter
            });
            return Result.ok(users.map(u => userModelToUserExtendedDto(u)));
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },


}

export default userRepository;