import { Router } from "express";
import { customerController } from "../controllers/customerController";

export const offerRouter = Router();

offerRouter.post("/", customerController.createCustomer);
offerRouter.get("/:id", customerController.getCustomer);
offerRouter.get("/", customerController.getCustomers);
offerRouter.put("/:id", customerController.updateCustomer);
offerRouter.delete("/:id", customerController.deleteCustomer);