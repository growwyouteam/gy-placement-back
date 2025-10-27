const Application = require('./schemas/applicationSchema');

/**
 * Application Model - MongoDB implementation
 */
class ApplicationModel {
  /**
   * Get all applications
   * @param {Object} filters - Optional filters
   * @returns {Promise<Array>} Array of applications
   */
  static async getAllApplications(filters = {}) {
    const query = {};

    if (filters.jobTitle) {
      query.jobTitle = new RegExp(filters.jobTitle, 'i');
    }

    if (filters.email) {
      query.email = filters.email.toLowerCase();
    }

    return await Application.find(query).sort({ appliedDate: -1 });
  }

  /**
   * Get application by ID
   * @param {String} id - Application ID
   * @returns {Promise<Object|null>} Application object or null
   */
  static async getApplicationById(id) {
    return await Application.findById(id);
  }

  /**
   * Create new application
   * @param {Object} applicationData - Application data
   * @returns {Promise<Object>} Created application
   */
  static async createApplication(applicationData) {
    const application = new Application(applicationData);
    return await application.save();
  }

  /**
   * Update application status
   * @param {String} id - Application ID
   * @param {String} status - New status
   * @returns {Promise<Object|null>} Updated application or null
   */
  static async updateApplicationStatus(id, status) {
    return await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );
  }

  /**
   * Delete application
   * @param {String} id - Application ID
   * @returns {Promise<Boolean>} Success status
   */
  static async deleteApplication(id) {
    const result = await Application.findByIdAndDelete(id);
    return result !== null;
  }

  /**
   * Get applications by job title
   * @param {String} jobTitle - Job title
   * @returns {Promise<Array>} Array of applications
   */
  static async getApplicationsByJob(jobTitle) {
    return await Application.find({
      jobTitle: new RegExp(jobTitle, 'i')
    }).sort({ appliedDate: -1 });
  }
}

module.exports = ApplicationModel;
