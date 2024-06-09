import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthApi from "../api/authApi";
import { useNavigate } from "react-router-dom";
import {LoginDto} from "../models/auth.ts";

type UseLoginProps = {
    redirect: string;
};

const useLogin = ({ redirect }: UseLoginProps) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutateAsync: login, isPending, isError } = useMutation({
        mutationFn: (loginData: LoginDto) => AuthApi.login(loginData),
        retry: false,
        onSuccess: () => {
            navigate(redirect);
            queryClient.invalidateQueries({ queryKey: ['auth'] });
        },
    });


    return { login, isPending, isError };
};


export default useLogin;
