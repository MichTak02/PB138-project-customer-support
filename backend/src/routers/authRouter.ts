import { Router } from "express";
import passport from "passport";
import {Role, RoleValues} from "../repositories/user/types";
import {authController} from "../controllers/authController";
import {authz} from "../middleware/authMiddleware";

declare global {
    namespace Express {
        interface User {
            id: number;
            email: string;
            displayName: string;
            role: Role;
        }
    }
}

export const authRouter = Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", passport.authenticate("local"), authController.login);

authRouter.get("/", passport.session(), authz(RoleValues.REGULAR), (req, res, next) => {
    res.send(req.user);
});

authRouter.post("/logout", passport.session(), authz(RoleValues.REGULAR), (req, res, next) => {
    req.logout(
        {
            keepSessionInfo: false,
        },
        (err) => {
            if (err) {
                return next(err);
            }
            res.status(204).end();
        }
    );
});

passport.serializeUser((user, done) => {
    process.nextTick(() => {
        return done(null, {id: user.id, email: user.email, displayName: user.displayName, role: user.role});
    });
});

passport.deserializeUser((user: Express.User, done) => {
    return done(null, user);
});
