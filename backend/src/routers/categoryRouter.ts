import { Router } from "express";
import { categoryController } from "../controllers/categoryController";

export const categoryRouter = Router();

categoryRouter.post("/", categoryController.createCategory);
categoryRouter.get("/:id", categoryController.getCategory);
categoryRouter.get("/", categoryController.getCategories);
categoryRouter.put("/:id", categoryController.updateCategory);
categoryRouter.delete("/:id", categoryController.deleteCategory);