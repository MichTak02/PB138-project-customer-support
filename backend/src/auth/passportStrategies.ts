import { Strategy as LocalStrategy } from "passport-local";
import {verifyPassword} from "../utils/userUtils";
import userRepository from "../repositories/user/userRepository";

export const passportLocalStrategy = () =>
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        async (email, password, done) => {
            const user = await userRepository.getByEmail(email);

            if (user.isErr) {
                return done(user.error);
            }

            if (!user.value) {
                return done(null, false, { message: "Incorrect email or password" });
            }

            const isPasswordCorrect = await verifyPassword(
                password,
                user.value.passwordHash
            );

            if (!isPasswordCorrect) {
                return done(null, false, { message: "Incorrect email or password" });
            }

            return done(null, user.value);
        }
    );
