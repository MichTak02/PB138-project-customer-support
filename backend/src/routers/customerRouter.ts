import { Router } from "express";
import { customerController } from "../controllers/customerController";
import passport from "passport";
import {authz} from "../middleware/authMiddleware";
import {RoleValues} from "../repositories/user/types";

export const customerRouter = Router();

customerRouter.post("/", passport.session(), authz(RoleValues.ADMIN), customerController.createCustomer);
customerRouter.get("/:id", passport.session(), authz(RoleValues.REGULAR), customerController.getCustomer);
customerRouter.get("/", passport.session(), authz(RoleValues.REGULAR), customerController.getCustomers);
customerRouter.put("/:id", passport.session(), authz(RoleValues.ADMIN), customerController.updateCustomer);
customerRouter.delete("/:id", passport.session(), authz(RoleValues.ADMIN), customerController.deleteCustomer);