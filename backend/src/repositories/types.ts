import type { Result } from '@badrap/result';

export type DbResult<T> = Promise<Result<T>>;

export type BaseModelId = {
    id: number
}