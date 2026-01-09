import { body, validationResult } from 'express-validator';

// Validation middleware
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({ field: err.path, message: err.msg })),
    });
  }
  next();
};

// Lead validation rules
export const leadValidationRules = () => {
  return [
    body('name')
      .trim()
      .notEmpty().withMessage('Name is required')
      .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
    body('email')
      .trim()
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Please provide a valid email'),
    body('phone')
      .trim()
      .notEmpty().withMessage('Phone number is required')
      .matches(/^[\d\s\-\+\(\)]+$/).withMessage('Please provide a valid phone number'),
    body('company')
      .optional()
      .trim()
      .isLength({ max: 100 }).withMessage('Company name must be less than 100 characters'),
    body('message')
      .optional()
      .trim()
      .isLength({ max: 1000 }).withMessage('Message must be less than 1000 characters'),
  ];
};

// Admin login validation rules
export const loginValidationRules = () => {
  return [
    body('email')
      .trim()
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Please provide a valid email'),
    body('password')
      .notEmpty().withMessage('Password is required'),
  ];
};

// Admin registration validation rules
export const registerValidationRules = () => {
  return [
    body('name')
      .trim()
      .notEmpty().withMessage('Name is required')
      .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
    body('email')
      .trim()
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Please provide a valid email'),
    body('password')
      .notEmpty().withMessage('Password is required')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ];
};
