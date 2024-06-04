import { Router } from "express";
import { chatCommunicationController } from "../controllers/chatCommunicationController";
import passport from "passport";
import {authz} from "../middleware/authMiddleware";
import {RoleValues} from "../repositories/user/types";

export const chatCommunicationRouter = Router();

chatCommunicationRouter.post("/", passport.session(), authz(RoleValues.REGULAR), chatCommunicationController.createChatCommunication);
chatCommunicationRouter.get("/:id", passport.session(), authz(RoleValues.REGULAR), chatCommunicationController.getChatCommunication);
chatCommunicationRouter.get("/", passport.session(), authz(RoleValues.REGULAR), chatCommunicationController.getChatCommunications);
chatCommunicationRouter.put("/:id", passport.session(), authz(RoleValues.REGULAR), chatCommunicationController.updateChatCommunication);
chatCommunicationRouter.delete("/:id", passport.session(), authz(RoleValues.REGULAR), chatCommunicationController.deleteChatCommunication);