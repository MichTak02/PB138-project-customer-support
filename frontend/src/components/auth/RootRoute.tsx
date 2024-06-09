import useAuth from "../../hooks/useAuth.ts";
import {Navigate} from "react-router-dom";

const RootRoute = () => {

    const user = useAuth();
    if (user.isLoading) {
        return <div>Loading...</div>
    }

    if (user.isError || user.auth === undefined) {
        return <Navigate to="/login"/>;
    }

    return <Navigate to="/auth/dashboard"/>;
};

export default RootRoute;