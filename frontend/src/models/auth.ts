import {Role} from "./user.ts";

export type LoginDto = {
    email: string
    password: string
}

export type AuthDto = {
    id: number;
    email: string;
    displayName: string;
    role: Role;
}

export type RegisterDto = {
    displayName: string,
    email: string,
    password: string,
    confirmPassword: string,
}