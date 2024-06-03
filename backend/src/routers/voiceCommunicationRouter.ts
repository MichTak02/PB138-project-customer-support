import { Router } from "express";
import multer from 'multer';
import { voiceCommunicationController } from "../controllers/voiceCommunicationController";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../../voice-communications/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

export const offerRouter = Router();

offerRouter.post("/", upload.single('file'), voiceCommunicationController.createVoiceCommunication);
offerRouter.get("/:id", voiceCommunicationController.getVoiceCommunication);
offerRouter.get("/", voiceCommunicationController.getVoiceCommunications);
offerRouter.put("/:id", voiceCommunicationController.updateVoiceCommunication);
offerRouter.delete("/:id", voiceCommunicationController.deleteVoiceCommunication);