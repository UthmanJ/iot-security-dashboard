import express from 'express';
import { getDevices, getDeviceById } from '../controllers/deviceController.js';

const router = express.Router();

router.get('/', getDevices);
router.get('/:id', getDeviceById);

export default router;