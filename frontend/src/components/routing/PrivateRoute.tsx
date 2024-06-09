import {Navigate, Outlet} from "react-router-dom";
import useAuth from "../../hooks/useAuth.ts";
import {Role, RoleValues} from "../../models/user.ts";

type AuthorizationProps = {
    role: Role
}

export const isAuthorized = (userRole: Role, role: Role) => {
    if (role === RoleValues.ADMIN) {
        return userRole === RoleValues.ADMIN
    }

    return userRole === RoleValues.ADMIN || userRole === RoleValues.REGULAR
};

const PrivateRoute = (props: AuthorizationProps) => {

    const user = useAuth();
    if (user.isLoading) {
        return <div>Loading...</div>
    }

    if (user.isError || user.auth === undefined || !isAuthorized(user.auth.role, props.role)) {
        return <Navigate to="/login"/>;
    }

    return <Outlet/>;
};

export default PrivateRoute;