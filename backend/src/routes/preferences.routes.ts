import { Router } from 'express';
import { savePreferences } from '../controllers/preferences.controller.js';
const router = Router();

router.post('/preferences', savePreferences);

export default router;
