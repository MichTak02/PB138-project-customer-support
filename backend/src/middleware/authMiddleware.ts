import { Request, Response, NextFunction } from 'express';
import {Role, RoleValues} from "../repositories/user/types";

const isAuthorized = (userRole: Role, role: Role) => {
    if (role === RoleValues.ADMIN) {
        return userRole === RoleValues.ADMIN
    }

    return userRole === RoleValues.ADMIN || userRole === RoleValues.REGULAR
};

export const authz = (role: Role) => (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
        res.status(401).send('Unauthorized');
        return;
    }

    if (isAuthorized(req.user?.role, role)) {
        next()
        return;
    }

    res.status(403).send('Forbidden');
};
