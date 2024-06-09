import BaseApi from "./baseApi.ts";
import {AuthDto, LoginDto} from "../models/auth.ts";

const LOGIN_PREFIX = '/auth/login';
const LOGOUT_PREFIX = '/auth/logout';
const AUTH_PREFIX = '/auth';

async function login(auth: LoginDto) {
    return BaseApi.postSingle<AuthDto>(LOGIN_PREFIX, auth);
}

async function auth() {
    return BaseApi.get<AuthDto>(AUTH_PREFIX);
}

async function logout() {
    return BaseApi.postSingle<void>(LOGOUT_PREFIX, {});
}

const AuthApi = {
    login,
    auth,
    logout
};

export default AuthApi;
