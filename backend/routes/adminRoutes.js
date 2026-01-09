import express from 'express';
import {
  registerAdmin,
  loginAdmin,
  getAllLeads,
  getLeadStats,
  getLeadById,
  updateLead,
  deleteLead,
  exportLeads,
  getAnalytics,
} from '../controllers/adminController.js';
import {
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';
import {
  createClient,
  updateClient,
  deleteClient,
} from '../controllers/clientController.js';
import {
  getAllSubscribers,
  deleteSubscriber,
} from '../controllers/subscriberController.js';
import { protect } from '../middleware/auth.js';
import {
  registerValidationRules,
  loginValidationRules,
  validate,
} from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.post('/register', registerValidationRules(), validate, registerAdmin);
router.post('/login', loginValidationRules(), validate, loginAdmin);

// Protected routes (require authentication)
router.get('/leads', protect, getAllLeads);
router.get('/leads/stats', protect, getLeadStats);
router.get('/leads/export', protect, exportLeads);
router.get('/leads/:id', protect, getLeadById);
router.put('/leads/:id', protect, updateLead);
router.delete('/leads/:id', protect, deleteLead);
router.get('/analytics', protect, getAnalytics);

// Project management routes
router.post('/projects', protect, createProject);
router.put('/projects/:id', protect, updateProject);
router.delete('/projects/:id', protect, deleteProject);

// Client management routes
router.post('/clients', protect, createClient);
router.put('/clients/:id', protect, updateClient);
router.delete('/clients/:id', protect, deleteClient);

// Subscriber management routes
router.get('/subscribers', protect, getAllSubscribers);
router.delete('/subscribers/:id', protect, deleteSubscriber);

export default router;
