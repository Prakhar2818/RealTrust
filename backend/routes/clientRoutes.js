import express from 'express';
import { getAllClients } from '../controllers/clientController.js';

const router = express.Router();

// Public route
router.get('/', getAllClients);

export default router;
