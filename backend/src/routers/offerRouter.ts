import { Router } from "express";
import { offerController } from "../controllers/offerController";
import passport from "passport";
import {authz} from "../middleware/authMiddleware";
import {RoleValues} from "../repositories/user/types";

export const offerRouter = Router();

offerRouter.post("/", passport.session(), authz(RoleValues.ADMIN), offerController.createOffer);
offerRouter.get("/:id", passport.session(), authz(RoleValues.REGULAR), offerController.getOffer);
offerRouter.get("/", passport.session(), authz(RoleValues.REGULAR), offerController.getOffers);
offerRouter.put("/:id", passport.session(), authz(RoleValues.ADMIN), offerController.updateOffer);
offerRouter.delete("/:id", passport.session(), authz(RoleValues.ADMIN), offerController.deleteOffer);
