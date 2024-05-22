import { Router } from "express";
import { categoryController } from "../controllers/categoryController";

export const productsRouter = Router();

productsRouter.post("/", categoryController.createCategory);
productsRouter.get("/:id", categoryController.getCategory);
productsRouter.get("/", categoryController.getCategories);
productsRouter.put("/:id", categoryController.updateCategory);
productsRouter.delete("/:id", categoryController.deleteCategory);