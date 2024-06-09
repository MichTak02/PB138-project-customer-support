import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AuthApi from "../api/authApi";

const useLogout = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutateAsync: logout, isPending, isError } = useMutation({
        mutationFn: () => AuthApi.logout(),
        retry: false,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['auth'] });
            navigate("/login");
        },
    });

    return { logout, isPending, isError };
};

export default useLogout;
