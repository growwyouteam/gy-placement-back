const JobModel = require('../models/jobModel');

/**
 * Get all jobs
 * @route GET /api/jobs
 */
const getAllJobs = async (req, res, next) => {
  try {
    const { category, location, type } = req.query;
    const filters = { category, location, type };
    
    const jobs = await JobModel.getAllJobs(filters);
    
    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single job by ID
 * @route GET /api/jobs/:id
 */
const getJobById = async (req, res, next) => {
  try {
    const job = await JobModel.getJobById(req.params.id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: job
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create new job
 * @route POST /api/jobs
 */
const createJob = async (req, res, next) => {
  try {
    const jobData = {
      title: req.body.title,
      location: req.body.location,
      salary: req.body.salary,
      qualification: req.body.qualification,
      experience: req.body.experience,
      keySkills: req.body.keySkills,
      description: req.body.description || '',
      category: req.body.category || 'General',
      type: req.body.type || 'Full-time'
    };
    
    const job = await JobModel.createJob(jobData);
    
    res.status(201).json({
      success: true,
      message: 'Job created successfully',
      data: job
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update job
 * @route PUT /api/jobs/:id
 */
const updateJob = async (req, res, next) => {
  try {
    const job = await JobModel.updateJob(req.params.id, req.body);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Job updated successfully',
      data: job
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete job
 * @route DELETE /api/jobs/:id
 */
const deleteJob = async (req, res, next) => {
  try {
    const success = await JobModel.deleteJob(req.params.id);
    
    if (!success) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Search jobs
 * @route GET /api/jobs/search/:keyword
 */
const searchJobs = async (req, res, next) => {
  try {
    const { keyword } = req.params;
    
    if (!keyword || keyword.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Search keyword is required'
      });
    }
    
    const jobs = await JobModel.searchJobs(keyword);
    
    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  searchJobs
};
