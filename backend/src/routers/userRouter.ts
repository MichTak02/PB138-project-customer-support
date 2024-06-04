import { Router } from "express";
import { userController } from "../controllers/userController";
import passport from "passport";
import {authz} from "../middleware/authMiddleware";
import {RoleValues} from "../repositories/user/types";

export const userRouter = Router();

userRouter.post("/", passport.session(), authz(RoleValues.ADMIN), userController.createUser);
userRouter.get("/:id", passport.session(), authz(RoleValues.REGULAR), userController.getUser);
userRouter.get("/", passport.session(), authz(RoleValues.REGULAR), userController.getUsers);
userRouter.put("/:id", passport.session(), authz(RoleValues.ADMIN), userController.updateUser);
userRouter.delete("/:id", passport.session(), authz(RoleValues.ADMIN), userController.deleteUser);