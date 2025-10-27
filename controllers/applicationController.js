const ApplicationModel = require('../models/applicationModel');

/**
 * Get all applications
 * @route GET /api/applications
 */
const getAllApplications = async (req, res, next) => {
  try {
    const { jobTitle, email } = req.query;
    const filters = { jobTitle, email };
    
    const applications = await ApplicationModel.getAllApplications(filters);
    
    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single application by ID
 * @route GET /api/applications/:id
 */
const getApplicationById = async (req, res, next) => {
  try {
    const application = await ApplicationModel.getApplicationById(req.params.id);
    
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: application
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create new application
 * @route POST /api/applications
 */
const createApplication = async (req, res, next) => {
  try {
    // Clean phone number (remove spaces, dashes, plus signs)
    const cleanPhone = req.body.phone ? req.body.phone.replace(/[\s\-\+]/g, '') : '';
    
    const applicationData = {
      // Required fields
      fullName: req.body.fullName,
      email: req.body.email,
      phone: cleanPhone,
      jobTitle: req.body.jobTitle,
      
      // Optional basic fields
      experience: req.body.experience || '',
      qualification: req.body.qualification || '',
      coverLetter: req.body.coverLetter || '',
      resumeUrl: req.body.resumeUrl || '',
      
      // Additional multi-step form fields
      address: req.body.address || '',
      city: req.body.city || '',
      state: req.body.state || '',
      pincode: req.body.pincode || '',
      department: req.body.department || '',
      expectedSalary: req.body.expectedSalary || '',
      availableFrom: req.body.availableFrom || null,
      institution: req.body.institution || '',
      yearOfPassing: req.body.yearOfPassing || '',
      percentage: req.body.percentage || '',
      previousCompany: req.body.previousCompany || '',
      previousRole: req.body.previousRole || '',
      skills: req.body.skills || '',
      languagesSpoken: req.body.languagesSpoken || '',
      finalDate: req.body.finalDate || null
    };
    
    const application = await ApplicationModel.createApplication(applicationData);
    
    res.status(201).json({
      success: true,
      message: 'Application submitted successfully! We will review your application and contact you soon.',
      data: application
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update application status
 * @route PATCH /api/applications/:id/status
 */
const updateApplicationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }
    
    const validStatuses = ['pending', 'reviewed', 'shortlisted', 'rejected', 'accepted'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }
    
    const application = await ApplicationModel.updateApplicationStatus(req.params.id, status);
    
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Application status updated successfully',
      data: application
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete application
 * @route DELETE /api/applications/:id
 */
const deleteApplication = async (req, res, next) => {
  try {
    const success = await ApplicationModel.deleteApplication(req.params.id);
    
    if (!success) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Application deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get applications by job title
 * @route GET /api/applications/job/:jobTitle
 */
const getApplicationsByJob = async (req, res, next) => {
  try {
    const { jobTitle } = req.params;
    const applications = await ApplicationModel.getApplicationsByJob(jobTitle);
    
    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllApplications,
  getApplicationById,
  createApplication,
  updateApplicationStatus,
  deleteApplication,
  getApplicationsByJob
};
