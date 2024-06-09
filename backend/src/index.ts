import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { env } from 'process';
import passport from "passport";
import {categoryRouter} from "./routers/categoryRouter";
import {productRouter} from "./routers/productRouter";
import {offerRouter} from "./routers/offerRouter";
import {userRouter} from "./routers/userRouter";
import {customerRouter} from "./routers/customerRouter";
import {chatCommunicationRouter} from "./routers/chatCommunicationRouter";
import {voiceCommunicationRouter} from "./routers/voiceCommunicationRouter";
import {passportLocalStrategy} from "./auth/passportStrategies";
import sessionMiddleware from "./middleware/sessionMiddleware";
import {authRouter} from "./routers/authRouter";
import {offerToProductRouter} from "./routers/offerToProductRouter";

config();

const app = express();
const port = env.PORT ?? 3000;

// CORS middleware
//app.use(cors());
app.use(cors({
    credentials: true,
    origin: env.FRONTEND_URL ?? "http://localhost:5173"
}));

// JSON middleware
app.use(express.json());

// parse URL encoded strings
app.use(express.urlencoded({ extended: true }));

passport.use(passportLocalStrategy());
app.use(sessionMiddleware())

app.use("/auth", authRouter)
app.use("/categories", categoryRouter)
app.use("/products", productRouter)
app.use("/offers", offerRouter)
app.use("/offerToProducts", offerToProductRouter)
app.use("/users", userRouter)
app.use("/customers", customerRouter)
app.use("/chatCommunications", chatCommunicationRouter)
app.use("/voiceCommunications", voiceCommunicationRouter)

app.use((_req, res) => {
    res.status(404).send('Not found');
});

app.listen(port, () => {
    console.log(
        `[${new Date().toISOString()}] Customer support API is listening on port ${port}`,
    );
});
