const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    validate: {
      validator: function(v) {
        // Remove any spaces, dashes, or plus signs
        const cleaned = v.replace(/[\s\-\+]/g, '');
        // Check if it's a valid 10-digit number starting with 6-9
        return /^[6-9]\d{9}$/.test(cleaned);
      },
      message: 'Please provide a valid 10-digit phone number starting with 6-9'
    }
  },
  jobTitle: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job'
  },
  experience: {
    type: String,
    trim: true,
    maxlength: [50, 'Experience cannot exceed 50 characters']
  },
  qualification: {
    type: String,
    trim: true,
    maxlength: [100, 'Qualification cannot exceed 100 characters']
  },
  coverLetter: {
    type: String,
    trim: true,
    maxlength: [1000, 'Cover letter cannot exceed 1000 characters']
  },
  resumeUrl: {
    type: String,
    trim: true
  },
  // Additional fields from multi-step form
  address: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    trim: true
  },
  state: {
    type: String,
    trim: true
  },
  pincode: {
    type: String,
    trim: true
  },
  department: {
    type: String,
    trim: true
  },
  expectedSalary: {
    type: String,
    trim: true
  },
  availableFrom: {
    type: Date
  },
  institution: {
    type: String,
    trim: true
  },
  yearOfPassing: {
    type: String,
    trim: true
  },
  percentage: {
    type: String,
    trim: true
  },
  previousCompany: {
    type: String,
    trim: true
  },
  previousRole: {
    type: String,
    trim: true
  },
  skills: {
    type: String,
    trim: true
  },
  languagesSpoken: {
    type: String,
    trim: true
  },
  finalDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'shortlisted', 'rejected', 'accepted'],
    default: 'pending'
  },
  appliedDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient queries
applicationSchema.index({ email: 1, jobTitle: 1 });
applicationSchema.index({ status: 1 });

module.exports = mongoose.model('Application', applicationSchema);
