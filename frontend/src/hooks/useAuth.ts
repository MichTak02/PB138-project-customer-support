import { useQuery } from "@tanstack/react-query";
import  AuthApi  from "../api/authApi";

const useAuth = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["auth"],
        retry: false,
        queryFn: () => AuthApi.auth(),
        staleTime: 1000 * 60 * 2,
        refetchOnWindowFocus: false,
    })

    return { auth: data, isLoading, isError };

}

export default useAuth;
