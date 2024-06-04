import { Router } from "express";
import passport from "passport";
import {Role} from "../repositories/user/types";
import {authController} from "../controllers/authController";

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

authRouter.get("/logout", passport.session(), (req, res, next) => {
    req.logout(
        {
            keepSessionInfo: false,
        },
        (err) => {
            if (err) {
                return next(err);
            }
            res.status(200).end();
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
