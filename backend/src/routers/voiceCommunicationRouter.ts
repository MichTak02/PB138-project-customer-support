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

export const voiceCommunicationRouter = Router();

voiceCommunicationRouter.post("/", upload.single('file'), voiceCommunicationController.createVoiceCommunication);
voiceCommunicationRouter.get("/:id", voiceCommunicationController.getVoiceCommunication);
voiceCommunicationRouter.get("/", voiceCommunicationController.getVoiceCommunications);
voiceCommunicationRouter.put("/:id", voiceCommunicationController.updateVoiceCommunication);
voiceCommunicationRouter.delete("/:id", voiceCommunicationController.deleteVoiceCommunication);