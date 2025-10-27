const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
    maxlength: [100, 'Location cannot exceed 100 characters']
  },
  salary: {
    type: String,
    required: [true, 'Salary is required'],
    trim: true,
    maxlength: [100, 'Salary cannot exceed 100 characters']
  },
  qualification: {
    type: String,
    required: [true, 'Qualification is required'],
    trim: true,
    maxlength: [200, 'Qualification cannot exceed 200 characters']
  },
  experience: {
    type: String,
    required: [true, 'Experience is required'],
    trim: true,
    maxlength: [100, 'Experience cannot exceed 100 characters']
  },
  keySkills: {
    type: String,
    required: [true, 'Key skills are required'],
    trim: true,
    maxlength: [300, 'Key skills cannot exceed 300 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  category: {
    type: String,
    default: 'General',
    trim: true
  },
  type: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'],
    default: 'Full-time'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  postedDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for search optimization
jobSchema.index({ title: 'text', location: 'text', keySkills: 'text', category: 'text' });

module.exports = mongoose.model('Job', jobSchema);
