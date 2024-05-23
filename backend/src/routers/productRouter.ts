import { Router } from "express";
import { productController } from "../controllers/productController";

export const productRouter = Router();

productRouter.post("/", productController.createProduct);
productRouter.get("/:id", productController.getProduct);
productRouter.get("/", productController.getProducts);
productRouter.put("/:id", productController.updateProduct);
productRouter.delete("/:id", productController.deleteProduct);
