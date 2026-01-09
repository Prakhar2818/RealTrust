import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure directories exist
const projectDir = 'uploads/projects/';
const clientDir = 'uploads/clients/';

if (!fs.existsSync(projectDir)) {
  fs.mkdirSync(projectDir, { recursive: true });
}
if (!fs.existsSync(clientDir)) {
  fs.mkdirSync(clientDir, { recursive: true });
}

// Configure storage for projects
const projectStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, projectDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'project-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Configure storage for clients
const clientStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, clientDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'client-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter to only accept images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

// Create upload middleware
const uploadProject = multer({
  storage: projectStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: fileFilter
});

const uploadClient = multer({
  storage: clientStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: fileFilter
});

export { uploadProject, uploadClient };
