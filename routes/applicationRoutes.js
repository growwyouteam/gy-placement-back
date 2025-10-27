const express = require('express');
const router = express.Router();
const {
  getAllApplications,
  getApplicationById,
  createApplication,
  updateApplicationStatus,
  deleteApplication,
  getApplicationsByJob
} = require('../controllers/applicationController');
const { validateJobApplication } = require('../middleware/validator');

/**
 * @route   GET /api/applications
 * @desc    Get all applications with optional filters
 * @access  Private (In production, add authentication middleware)
 * @query   jobTitle, email
 */
router.get('/', getAllApplications);

/**
 * @route   GET /api/applications/job/:jobTitle
 * @desc    Get applications by job title
 * @access  Private (In production, add authentication middleware)
 */
router.get('/job/:jobTitle', getApplicationsByJob);

/**
 * @route   GET /api/applications/:id
 * @desc    Get single application by ID
 * @access  Private (In production, add authentication middleware)
 */
router.get('/:id', getApplicationById);

/**
 * @route   POST /api/applications
 * @desc    Submit new job application
 * @access  Public
 */
router.post('/', validateJobApplication, createApplication);

/**
 * @route   PATCH /api/applications/:id/status
 * @desc    Update application status
 * @access  Private (In production, add authentication middleware)
 */
router.patch('/:id/status', updateApplicationStatus);

/**
 * @route   DELETE /api/applications/:id
 * @desc    Delete application
 * @access  Private (In production, add authentication middleware)
 */
router.delete('/:id', deleteApplication);

module.exports = router;
