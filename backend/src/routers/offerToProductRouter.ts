import { Router } from "express";
import { offerToProductController } from "../controllers/offerToProductController";
import passport from "passport";
import {authz} from "../middleware/authMiddleware";
import {RoleValues} from "../repositories/user/types";

export const offerToProductRouter = Router();

offerToProductRouter.post("/", passport.session(), authz(RoleValues.ADMIN), offerToProductController.createOfferToProduct);
offerToProductRouter.get("/:id", passport.session(), authz(RoleValues.REGULAR), offerToProductController.getOfferToProduct);
offerToProductRouter.get("/", passport.session(), authz(RoleValues.REGULAR), offerToProductController.getOffersToProducts);
offerToProductRouter.put("/:id", passport.session(), authz(RoleValues.ADMIN), offerToProductController.updateOfferToProduct);
offerToProductRouter.delete("/:id", passport.session(), authz(RoleValues.ADMIN), offerToProductController.deleteOfferToProduct);
