import { Router } from "express";
import { userController } from "../controllers/userController";

export const userRouter = Router();

userRouter.post("/", userController.createUser);
userRouter.get("/:id", userController.getUser);
userRouter.get("/", userController.getUsers);
userRouter.put("/:id", userController.updateUser);
userRouter.delete("/:id", userController.deleteUser);