import express from 'express';
import { createLead } from '../controllers/leadController.js';
import { leadValidationRules, validate } from '../middleware/validation.js';

const router = express.Router();

// Public route for creating leads
router.post('/', leadValidationRules(), validate, createLead);

export default router;
