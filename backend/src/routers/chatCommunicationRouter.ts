import { Router } from "express";
import { chatCommunicationController } from "../controllers/chatCommunicationController";

export const chatCommunicationRouter = Router();

chatCommunicationRouter.post("/", chatCommunicationController.createChatCommunication);
chatCommunicationRouter.get("/:id", chatCommunicationController.getChatCommunication);
chatCommunicationRouter.get("/", chatCommunicationController.getChatCommunications);
chatCommunicationRouter.put("/:id", chatCommunicationController.updateChatCommunication);
chatCommunicationRouter.delete("/:id", chatCommunicationController.deleteChatCommunication);