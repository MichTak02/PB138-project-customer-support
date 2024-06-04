import { Router } from "express";
import multer from 'multer';
import { voiceCommunicationController } from "../controllers/voiceCommunicationController";
import passport from "passport";
import {authz} from "../middleware/authMiddleware";
import {RoleValues} from "../repositories/user/types";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../../voice-communications/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

export const voiceCommunicationRouter = Router();

voiceCommunicationRouter.post("/", passport.session(), authz(RoleValues.REGULAR), upload.single('file'), voiceCommunicationController.createVoiceCommunication);
voiceCommunicationRouter.get("/:id", passport.session(), authz(RoleValues.REGULAR), voiceCommunicationController.getVoiceCommunication);
voiceCommunicationRouter.get("/", passport.session(), authz(RoleValues.REGULAR), voiceCommunicationController.getVoiceCommunications);
voiceCommunicationRouter.put("/:id", passport.session(), authz(RoleValues.REGULAR), voiceCommunicationController.updateVoiceCommunication);
voiceCommunicationRouter.delete("/:id", passport.session(), authz(RoleValues.REGULAR), voiceCommunicationController.deleteVoiceCommunication);