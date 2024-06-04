import { Router } from "express";
import { customerController } from "../controllers/customerController";

export const customerRouter = Router();

customerRouter.post("/", customerController.createCustomer);
customerRouter.get("/:id", customerController.getCustomer);
customerRouter.get("/", customerController.getCustomers);
customerRouter.put("/:id", customerController.updateCustomer);
customerRouter.delete("/:id", customerController.deleteCustomer);