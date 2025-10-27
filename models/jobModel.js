const Job = require('./schemas/jobSchema');

/**
 * Job Model - MongoDB implementation
 */
class JobModel {
  /**
   * Get all jobs
   * @param {Object} filters - Optional filters (category, location, type)
   * @returns {Promise<Array>} Array of jobs
   */
  static async getAllJobs(filters = {}) {
    const query = { isActive: true };

    if (filters.category) {
      query.category = new RegExp(filters.category, 'i');
    }

    if (filters.location) {
      query.location = new RegExp(filters.location, 'i');
    }

    if (filters.type) {
      query.type = new RegExp(filters.type, 'i');
    }

    return await Job.find(query).sort({ postedDate: -1 });
  }

  /**
   * Get job by ID
   * @param {String} id - Job ID
   * @returns {Promise<Object|null>} Job object or null
   */
  static async getJobById(id) {
    return await Job.findOne({ _id: id, isActive: true });
  }

  /**
   * Create new job
   * @param {Object} jobData - Job data
   * @returns {Promise<Object>} Created job
   */
  static async createJob(jobData) {
    const job = new Job(jobData);
    return await job.save();
  }

  /**
   * Update job
   * @param {String} id - Job ID
   * @param {Object} updateData - Data to update
   * @returns {Promise<Object|null>} Updated job or null
   */
  static async updateJob(id, updateData) {
    return await Job.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
  }

  /**
   * Delete job (soft delete)
   * @param {String} id - Job ID
   * @returns {Promise<Boolean>} Success status
   */
  static async deleteJob(id) {
    const result = await Job.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
    return result !== null;
  }

  /**
   * Search jobs by keyword
   * @param {String} keyword - Search keyword
   * @returns {Promise<Array>} Array of matching jobs
   */
  static async searchJobs(keyword) {
    return await Job.find({
      isActive: true,
      $text: { $search: keyword }
    }).sort({ postedDate: -1 });
  }

  /**
   * Seed initial jobs (for first-time setup)
   * @returns {Promise<void>}
   */
  static async seedJobs() {
    const count = await Job.countDocuments();
    if (count > 0) return; // Don't seed if jobs already exist

    const initialJobs = [
      {
        title: 'Sales Executive',
        location: 'Agra',
        salary: '10k – 14k/Months',
        qualification: '12 and Graduate pass and Others',
        experience: 'Fresher / 1 year',
        keySkills: 'Communication, Teamwork, confidence',
        description: 'We are looking for a dynamic Sales Executive to join our team.',
        category: 'Sales',
        type: 'Full-time'
      },
      {
        title: 'Telecaller',
        location: 'Agra',
        salary: '10k - 12k/Months',
        qualification: '12 pass , BA , BBA and Others',
        experience: 'Fresher / 1 year',
        keySkills: 'Communication, Teamwork, Problem solving',
        description: 'Join our customer service team as a Telecaller.',
        category: 'Customer Service',
        type: 'Full-time'
      },
      {
        title: 'Electronic Engineer',
        location: 'Delhi NCR',
        salary: '25k - 30k/Months',
        qualification: 'Diploma , B.Tech, ITI',
        experience: 'Fresher / Experience',
        keySkills: 'Adaptability, Problem Solving, Critical Thinking & Creativity & Innovation and Other',
        description: 'Seeking an Electronic Engineer for our technical team.',
        category: 'Technology',
        type: 'Full-time'
      },
      {
        title: 'Operator & Executive',
        location: 'Noida',
        salary: '18,000 – ₹25,000 / Month',
        qualification: '10th, 12th, Graduation and Others',
        experience: '0 – 5 Year',
        keySkills: 'Production, Teamwork, Discipline and Others',
        description: 'Looking for dedicated Operators and Executives.',
        category: 'Operations',
        type: 'Full-time'
      },
      {
        title: 'Mechanical Engineer',
        location: 'Agra',
        salary: '25k - 30k/Months',
        qualification: 'B.Tech , Diploma , ITI',
        experience: 'Fresher / Experience',
        keySkills: 'Adaptability, Problem Solving, Critical Thinking & Creativity & Innovation and Others',
        description: 'Join our engineering team as a Mechanical Engineer.',
        category: 'Technology',
        type: 'Full-time'
      },
      {
        title: 'Electrical Engineer',
        location: 'Delhi NCR',
        salary: '25k - 30k/Months',
        qualification: 'B.Tech, diploma, ITI',
        experience: 'Fresher / Experience',
        keySkills: 'Adaptability, Problem Solving, Critical Thinking & Creativity & Innovation and Others',
        description: 'Electrical Engineer position available in our growing team.',
        category: 'Technology',
        type: 'Full-time'
      }
    ];

    await Job.insertMany(initialJobs);
    console.log('✅ Initial jobs seeded successfully');
  }
}

module.exports = JobModel;
