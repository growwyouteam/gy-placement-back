/**
 * Database Seeding Script
 * Run this to populate the database with initial jobs
 */

require('dotenv').config();
const connectDB = require('./config/database');
const JobModel = require('./models/jobModel');

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...\n');

    // Connect to MongoDB
    await connectDB();

    // Force seed jobs (even if they exist)
    console.log('📦 Seeding jobs...');
    await JobModel.seedJobs();

    console.log('\n✅ Database seeding completed successfully!');
    console.log('🎉 You can now run the server and see jobs on the frontend.\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeding
seedDatabase();
