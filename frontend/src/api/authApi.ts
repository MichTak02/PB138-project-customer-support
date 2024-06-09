import BaseApi from "./baseApi.ts";
import {AuthDto, LoginDto, RegisterDto} from "../models/auth.ts";

const LOGIN_PREFIX = '/auth/login';
const LOGOUT_PREFIX = '/auth/logout';
const REGISTER_PREFIX = '/auth/register';
const AUTH_PREFIX = '/auth';

async function login(auth: LoginDto) {
    return BaseApi.postSingle<AuthDto>(LOGIN_PREFIX, auth);
}

async function register(registerData: RegisterDto) {
    return BaseApi.postSingle<void>(REGISTER_PREFIX, registerData);
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
    logout,
    register
};

export default AuthApi;
