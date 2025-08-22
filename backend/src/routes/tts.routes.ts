import { Router } from "express";
import { generateTTS } from "../controllers/tts.controller.js";

const router = Router();

// ✅ Remove the extra `/tts` here
router.post("/", generateTTS);

export default router;
