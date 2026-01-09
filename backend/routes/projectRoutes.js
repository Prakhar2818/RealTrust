import express from 'express';
import { getAllProjects } from '../controllers/projectController.js';

const router = express.Router();

// Public route
router.get('/', getAllProjects);

export default router;
