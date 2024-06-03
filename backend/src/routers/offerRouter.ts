import { Router } from "express";
import { offerController } from "../controllers/offerController";

export const offerRouter = Router();

offerRouter.post("/", offerController.createOffer);
offerRouter.get("/:id", offerController.getOffer);
offerRouter.get("/", offerController.getOffers);
offerRouter.put("/:id", offerController.updateOffer);
offerRouter.delete("/:id", offerController.deleteOffer);
