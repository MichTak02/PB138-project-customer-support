import { Router } from "express";
import { productController } from "../controllers/productController";
import passport from "passport";
import {authz} from "../middleware/authMiddleware";
import {RoleValues} from "../repositories/user/types";

export const productRouter = Router();

productRouter.post("/", passport.session(), authz(RoleValues.ADMIN), productController.createProduct);
productRouter.get("/:id", passport.session(), authz(RoleValues.REGULAR), productController.getProduct);
productRouter.get("/", passport.session(), authz(RoleValues.REGULAR), productController.getProducts);
productRouter.put("/:id", passport.session(), authz(RoleValues.ADMIN), productController.updateProduct);
productRouter.delete("/:id", passport.session(), authz(RoleValues.ADMIN), productController.deleteProduct);
