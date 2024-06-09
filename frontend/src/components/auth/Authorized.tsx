import {isAuthorized} from "./PrivateRoute.tsx";
import {FC, ReactNode} from "react";
import {Role} from "../../models/user.ts";
import useAuth from "../../hooks/useAuth.ts";

type AuthorizedProps = {
    children: ReactNode;
    role: Role;
};

const Authorized: FC<AuthorizedProps> = ({ children, role }) => {
    const { auth, isLoading, isError } = useAuth();

    if (isLoading) return null;
    if (isError) return null;
    if (isError || auth === undefined || !isAuthorized(auth.role,role)) return null;

    return <>{children}</>;
};

export default Authorized;
