const express = require('express');
const router = express.Router();
const {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  searchJobs
} = require('../controllers/jobController');
const { validateJob } = require('../middleware/validator');

/**
 * @route   GET /api/jobs
 * @desc    Get all jobs with optional filters
 * @access  Public
 * @query   category, location, type
 */
router.get('/', getAllJobs);

/**
 * @route   GET /api/jobs/search/:keyword
 * @desc    Search jobs by keyword
 * @access  Public
 */
router.get('/search/:keyword', searchJobs);

/**
 * @route   GET /api/jobs/:id
 * @desc    Get single job by ID
 * @access  Public
 */
router.get('/:id', getJobById);

/**
 * @route   POST /api/jobs
 * @desc    Create new job
 * @access  Private (In production, add authentication middleware)
 */
router.post('/', validateJob, createJob);

/**
 * @route   PUT /api/jobs/:id
 * @desc    Update job
 * @access  Private (In production, add authentication middleware)
 */
router.put('/:id', validateJob, updateJob);

/**
 * @route   DELETE /api/jobs/:id
 * @desc    Delete job
 * @access  Private (In production, add authentication middleware)
 */
router.delete('/:id', deleteJob);

module.exports = router;
