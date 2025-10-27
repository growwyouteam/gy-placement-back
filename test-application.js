// Test application creation
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/database');
const Application = require('./models/schemas/applicationSchema');

async function testApplication() {
  try {
    console.log('Connecting to MongoDB...');
    await connectDB();
    
    console.log('\nTesting application creation...');
    
    const testData = {
      fullName: 'Test User',
      email: 'test@example.com',
      phone: '9876543210',
      jobTitle: 'Test Job',
      address: 'Test Address',
      city: 'Test City',
      state: 'Test State',
      pincode: '123456',
      department: 'IT',
      expectedSalary: '50000',
      qualification: 'B.Tech',
      institution: 'Test College',
      yearOfPassing: '2023',
      percentage: '85',
      experience: '2 years',
      previousCompany: 'Test Company',
      previousRole: 'Developer',
      skills: 'JavaScript, Node.js',
      coverLetter: 'Test cover letter',
      languagesSpoken: 'English, Hindi'
    };
    
    console.log('Creating application with data:', JSON.stringify(testData, null, 2));
    
    const application = new Application(testData);
    await application.save();
    
    console.log('\n✅ Application created successfully!');
    console.log('Application ID:', application._id);
    
    // Clean up
    await Application.deleteOne({ _id: application._id });
    console.log('✅ Test application deleted');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error('Error details:', error);
    process.exit(1);
  }
}

testApplication();
