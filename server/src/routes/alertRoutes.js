import express from 'express';
import { getAlerts, resolveAlert } from '../controllers/alertController.js';

const router = express.Router();

router.get('/', getAlerts);
router.patch('/:id/resolve', resolveAlert);

export default router;