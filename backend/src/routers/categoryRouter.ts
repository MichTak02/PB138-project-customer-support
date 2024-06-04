import { Router } from "express";
import { categoryController } from "../controllers/categoryController";
import passport from "passport";
import {authz} from "../middleware/authMiddleware";
import {RoleValues} from "../repositories/user/types";

export const categoryRouter = Router();

categoryRouter.post("/", passport.session(), authz(RoleValues.ADMIN), categoryController.createCategory);
categoryRouter.get("/:id", passport.session(), authz(RoleValues.REGULAR), categoryController.getCategory);
categoryRouter.get("/", passport.session(), authz(RoleValues.REGULAR), categoryController.getCategories);
categoryRouter.put("/:id", passport.session(), authz(RoleValues.ADMIN), categoryController.updateCategory);
categoryRouter.delete("/:id", passport.session(), authz(RoleValues.ADMIN), categoryController.deleteCategory);