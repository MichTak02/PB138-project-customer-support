import {useMutation} from "@tanstack/react-query";
import {RegisterDto} from "../models/auth.ts";
import AuthApi from "../api/authApi.ts";

const useRegister = () => {
    return useMutation({
        mutationFn: (data: RegisterDto) => AuthApi.register(data),
    });
};


export default useRegister;