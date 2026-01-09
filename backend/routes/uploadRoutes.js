import express from 'express';
import { uploadProject, uploadClient } from '../middleware/upload.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Upload project image
router.post('/project', protect, uploadProject.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const imageUrl = `/uploads/projects/${req.file.filename}`;
    res.status(200).json({
      message: 'File uploaded successfully',
      imageUrl: imageUrl
    });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading file', error: error.message });
  }
});

// Upload client image
router.post('/client', protect, uploadClient.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const imageUrl = `/uploads/clients/${req.file.filename}`;
    res.status(200).json({
      message: 'File uploaded successfully',
      imageUrl: imageUrl
    });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading file', error: error.message });
  }
});

export default router;
