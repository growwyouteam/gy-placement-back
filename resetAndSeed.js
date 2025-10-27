/**
 * Reset and Seed Database Script
 * This will clear all jobs and add fresh ones
 */

require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/database');
const Job = require('./models/schemas/jobSchema');

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

async function resetAndSeed() {
  try {
    console.log('🔄 Connecting to MongoDB...\n');
    await connectDB();

    console.log('🗑️  Deleting existing jobs...');
    const deleteResult = await Job.deleteMany({});
    console.log(`   Deleted ${deleteResult.deletedCount} jobs\n`);

    console.log('📦 Adding fresh jobs to database...');
    const insertedJobs = await Job.insertMany(initialJobs);
    console.log(`   ✅ Successfully added ${insertedJobs.length} jobs!\n`);

    console.log('📋 Jobs in database:');
    insertedJobs.forEach((job, index) => {
      console.log(`   ${index + 1}. ${job.title} - ${job.location}`);
    });

    console.log('\n✅ Database reset and seeding completed successfully!');
    console.log('🎉 Now start your server: npm run dev\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the script
resetAndSeed();
