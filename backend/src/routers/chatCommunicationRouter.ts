import { Router } from "express";
import multer from 'multer';
import { chatCommunicationController } from "../controllers/chatCommunicationController";

export const offerRouter = Router();

offerRouter.post("/", chatCommunicationController.createChatCommunication);
offerRouter.get("/:id", chatCommunicationController.getChatCommunication);
offerRouter.get("/", chatCommunicationController.getChatCommunications);
offerRouter.put("/:id", chatCommunicationController.updateChatCommunication);
offerRouter.delete("/:id", chatCommunicationController.deleteChatCommunication);