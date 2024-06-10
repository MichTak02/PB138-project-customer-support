import {Result} from "@badrap/result";
import { Prisma } from "@prisma/client";
import {ConflictError, InternalError, NotFoundError} from "../errors/errors";

export const READ_MANY_TAKE = 20

export const handleRepositoryErrors = (e: unknown) => {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
            return Result.err(new ConflictError(e.message));
        }
        if (e.code === 'P2001') {
            return Result.err(new NotFoundError(e.message));
        }
    }
    else if (e instanceof Error) {
        return Result.err(e)
    }

    return Result.err(new InternalError());
}