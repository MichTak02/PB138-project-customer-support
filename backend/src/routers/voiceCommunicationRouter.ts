import { Router } from "express";
import multer from 'multer';
import { voiceCommunicationController } from "../controllers/voiceCommunicationController";
import passport from "passport";
import {authz} from "../middleware/authMiddleware";
import {RoleValues} from "../repositories/user/types";
import path from "node:path";
import {handleControllerErrors, parseRequest} from "../utils/controllerUtils";
import {getAudioFileRequestSchema} from "../validationSchemas/voiceCommunicationValidationSchemas";
import {voiceCommunicationRepository} from "../repositories/communication/communicationRepository";

const uploadDir = process.env.UPLOAD_DIR ?? __dirname;
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        const ext = path.extname(file.originalname);
        if(ext !== '.mp3' && ext !== '.wav' && ext !== '.flac') {
            return callback(new Error('Only audio files are allowed'))
        }
        callback(null, true)
    },
});

export const voiceCommunicationRouter = Router();

voiceCommunicationRouter.post("/", passport.session(), authz(RoleValues.REGULAR), upload.single('file'), voiceCommunicationController.createVoiceCommunication);
voiceCommunicationRouter.get("/:id", passport.session(), authz(RoleValues.REGULAR), voiceCommunicationController.getVoiceCommunication);
voiceCommunicationRouter.get("/", passport.session(), authz(RoleValues.REGULAR), voiceCommunicationController.getVoiceCommunications);
voiceCommunicationRouter.put("/:id", passport.session(), authz(RoleValues.REGULAR), upload.single('file'), voiceCommunicationController.updateVoiceCommunication);
voiceCommunicationRouter.delete("/:id", passport.session(), authz(RoleValues.REGULAR), voiceCommunicationController.deleteVoiceCommunication);

voiceCommunicationRouter.get("/audioFile/:id", passport.session(), authz(RoleValues.REGULAR), async (req, res) => {
    const request = await parseRequest(getAudioFileRequestSchema, req, res);
    if (request === null) {
        return;
    }

    const voiceCommPath = await voiceCommunicationRepository.getVoiceCommunicationAudioFilePath(request.params.id)
    if (voiceCommPath.isErr) {
        handleControllerErrors(voiceCommPath.error, res);
        return;
    }

    res.status(200).sendFile(path.join(__dirname, process.env.UPLOAD_DIR ?? "", voiceCommPath.value));
});
