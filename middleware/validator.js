const { body, validationResult } = require('express-validator');

/**
 * Middleware to handle validation errors
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};

/**
 * Validation rules for job application
 */
const validateJobApplication = [
  body('fullName')
    .trim()
    .notEmpty().withMessage('Full name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .matches(/^[6-9]\d{9}$/).withMessage('Please provide a valid 10-digit Indian phone number'),
  
  body('jobTitle')
    .trim()
    .notEmpty().withMessage('Job title is required'),
  
  body('experience')
    .optional()
    .trim()
    .isLength({ max: 50 }).withMessage('Experience must not exceed 50 characters'),
  
  body('qualification')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('Qualification must not exceed 100 characters'),
  
  body('coverLetter')
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage('Cover letter must not exceed 1000 characters'),
  
  handleValidationErrors
];

/**
 * Validation rules for contact form
 */
const validateContactForm = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('phone')
    .optional()
    .trim()
    .matches(/^[6-9]\d{9}$/).withMessage('Please provide a valid 10-digit Indian phone number'),
  
  body('subject')
    .trim()
    .notEmpty().withMessage('Subject is required')
    .isLength({ min: 5, max: 200 }).withMessage('Subject must be between 5 and 200 characters'),
  
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 10, max: 2000 }).withMessage('Message must be between 10 and 2000 characters'),
  
  handleValidationErrors
];

/**
 * Validation rules for job creation/update
 */
const validateJob = [
  body('title')
    .trim()
    .notEmpty().withMessage('Job title is required')
    .isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters'),
  
  body('location')
    .trim()
    .notEmpty().withMessage('Location is required')
    .isLength({ max: 100 }).withMessage('Location must not exceed 100 characters'),
  
  body('salary')
    .trim()
    .notEmpty().withMessage('Salary is required')
    .isLength({ max: 100 }).withMessage('Salary must not exceed 100 characters'),
  
  body('qualification')
    .trim()
    .notEmpty().withMessage('Qualification is required')
    .isLength({ max: 200 }).withMessage('Qualification must not exceed 200 characters'),
  
  body('experience')
    .trim()
    .notEmpty().withMessage('Experience is required')
    .isLength({ max: 100 }).withMessage('Experience must not exceed 100 characters'),
  
  body('keySkills')
    .trim()
    .notEmpty().withMessage('Key skills are required')
    .isLength({ max: 300 }).withMessage('Key skills must not exceed 300 characters'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 2000 }).withMessage('Description must not exceed 2000 characters'),
  
  handleValidationErrors
];

module.exports = {
  validateJobApplication,
  validateContactForm,
  validateJob,
  handleValidationErrors
};
