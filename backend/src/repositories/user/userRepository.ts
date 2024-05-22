import {Result} from "@badrap/result";
import {DbResult} from "../types";
import {UserCreateDto, UserDto, UserUpdateDto} from "./types";
import prisma from "../client";
import {handleRepositoryErrors} from "../../utils/repositoryUtils";
import {userModelToUserDto} from "./mappers";

export const userRepository = {
    async create (data: UserCreateDto): DbResult<UserDto> {
        try {
            const user = await prisma.user.create({ data });

            return Result.ok(userModelToUserDto(user));
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    async update(id: string, data: UserUpdateDto): DbResult<UserDto> {
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

    async delete(id: string): DbResult<UserDto> {
        try {
            const result = await prisma.$transaction(async (tx) => {
                const userPlaylists = await tx.playlist.findMany({
                    where: {
                        ownerId: id
                    },
                    select: {id: true}
                })


                for (const userPlaylist of userPlaylists) {
                    await tx.playlistSong.deleteMany({
                        where: {
                            playlistId: userPlaylist.id,
                        },
                    })
                }

                await tx.playlist.deleteMany({
                    where: {
                        ownerId: id,
                    },
                })

                await tx.userLikedSongs.deleteMany({
                    where: {
                        userId: id
                    }
                })

                const deletedUser = await tx.user.delete({
                    where: {
                        id: id
                    }
                });
                return deletedUser
            }, {timeout: 10000});

            return Result.ok(userModelToUserDto(result));
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    async login(email: string, passwordHash: string): DbResult<string> {
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

    async readOne(id: string): DbResult<UserExtended> {
        try {
            const user = await prisma.user.findFirstOrThrow({
                where : {
                    id: id
                },
                include: {
                    playlists: true,
                    albums: true,
                    likedSongs: {select: {song: true, likedOn: true}},
                    lastPlayedSong: true
                }
            });
            return Result.ok(dbUserToUserExtended(user));
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    async readMany(cursorId: string | undefined): DbResult<UserExtended[]> {
        try {
            const includeObj = {
                playlists: true,
                albums: true,
                likedSongs: {select: {song: true, likedOn: true}},
                lastPlayedSong: true
            }

            if (!cursorId) {
                const users = await prisma.user.findMany({
                    take: READ_MANY_TAKE,
                    orderBy: { id: 'asc' },
                    include: includeObj
                });

                return Result.ok(users.map(u => dbUserToUserExtended(u)));
            }

            const users = await prisma.user.findMany({
                take: READ_MANY_TAKE,
                skip: 1,
                cursor: { id: cursorId },
                orderBy: { id: 'asc' },
                include: includeObj
            });
            return Result.ok(users.map(u => dbUserToUserExtended(u)));
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    async likeSong(userId: string, songId: string): DbResult<string> {
        try {
            await prisma.userLikedSongs.create({
                data: {
                    likedOn: new Date(Date.now()),
                    user: {connect: {id: userId}},
                    song: {connect: {id: songId}},
                },
            });
            return Result.ok(songId);
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    async unlikeSong(userId: string, songId: string): DbResult<string> {
        try {
            await prisma.userLikedSongs.delete({
                where: {
                    userLikedSongsId: {
                        userId: userId,
                        songId: songId
                    }
                },
            });
            return Result.ok(songId);
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    async setLastPlayedSong(userId: string, songId: string): DbResult<string> {
        try {
            await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    lastPlayedSong: {
                        connect: {
                            id: songId
                        }
                    }
                }
            });
            return Result.ok(songId);
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    async addPlaylist(userId: string, playlistId: string): DbResult<string> {
        try {
            await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    playlists: {
                        connect: {id: playlistId}
                    }
                }
            })

            return Result.ok(playlistId);
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    async removePlaylist(userId: string, playlistId: string): DbResult<string> {
        try {
            await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    playlists: {
                        disconnect: {id: playlistId}
                    }
                }
            })

            return Result.ok(playlistId);
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    async addAlbum(userId: string, albumId: string): DbResult<string> {
        try {
            await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    albums: {
                        connect: {id: albumId}
                    }
                }
            })

            return Result.ok(albumId);
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    },

    async removeAlbum(userId: string, albumId: string): DbResult<string> {
        try {
            await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    albums: {
                        disconnect: {id: albumId}
                    }
                }
            })

            return Result.ok(albumId);
        } catch (error) {
            return handleRepositoryErrors(error);
        }
    }
}

export default userRepository;