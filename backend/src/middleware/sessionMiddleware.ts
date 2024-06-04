import expressSession from "express-session";
import {redisClient} from "../redisClient";
import RedisStore from "connect-redis";
import { env } from 'process';

const sessionMiddleware = () => expressSession({
    secret: env.SESSION_SECRET ?? "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true },
    store: new RedisStore({ client: redisClient, prefix: "x-session:" }),
});

export default sessionMiddleware;