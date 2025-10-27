# GrowwYou Job Portal - Backend API

Backend API for the GrowwYou Job Portal built with Node.js, Express, MongoDB, and comprehensive validation.

## 🚀 Features

- **RESTful API** with Express.js
- **MongoDB Database** with Mongoose ODM
- **Data Validation** using express-validator
- **Security** with Helmet.js
- **CORS** enabled for frontend integration
- **Error Handling** with custom middleware
- **Environment Configuration** with dotenv
- **Auto-seeding** of initial job data
- **Compression** for optimized responses
- **Request Logging** with Morgan

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB installation)
- npm or yarn package manager

## 🛠️ Installation

1. **Navigate to the backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Update the MongoDB URI and other settings in `.env`

## ⚙️ Environment Variables

Create a `.env` file in the backend root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:3000

# API Configuration
API_VERSION=v1

# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority
```

## 🚀 Running the Server

### Development Mode (with nodemon):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## 📡 API Endpoints

### Health Check
- **GET** `/api/health` - Check API status

### Jobs
- **GET** `/api/jobs` - Get all jobs (supports filters: category, location, type)
- **GET** `/api/jobs/:id` - Get single job by ID
- **GET** `/api/jobs/search/:keyword` - Search jobs by keyword
- **POST** `/api/jobs` - Create new job (with validation)
- **PUT** `/api/jobs/:id` - Update job (with validation)
- **DELETE** `/api/jobs/:id` - Delete job (soft delete)

### Applications
- **GET** `/api/applications` - Get all applications (supports filters: jobTitle, email)
- **GET** `/api/applications/:id` - Get single application by ID
- **GET** `/api/applications/job/:jobTitle` - Get applications by job title
- **POST** `/api/applications` - Submit job application (with validation)
- **PATCH** `/api/applications/:id/status` - Update application status
- **DELETE** `/api/applications/:id` - Delete application

### Contact
- **GET** `/api/contact` - Get all contact messages
- **GET** `/api/contact/:id` - Get single contact message by ID
- **POST** `/api/contact` - Submit contact form (with validation)
- **PATCH** `/api/contact/:id/status` - Update contact status
- **DELETE** `/api/contact/:id` - Delete contact message

## 📝 Request Examples

### Create Job Application
```bash
POST /api/applications
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "jobTitle": "Sales Executive",
  "experience": "2 years",
  "qualification": "Graduate",
  "coverLetter": "I am interested in this position..."
}
```

### Submit Contact Form
```bash
POST /api/contact
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "9876543210",
  "subject": "Inquiry about services",
  "message": "I would like to know more about your services..."
}
```

### Search Jobs
```bash
GET /api/jobs/search/engineer
```

### Filter Jobs
```bash
GET /api/jobs?category=Technology&location=Agra
```

## 🗂️ Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection configuration
├── controllers/
│   ├── jobController.js     # Job-related business logic
│   ├── applicationController.js
│   └── contactController.js
├── middleware/
│   ├── errorHandler.js      # Global error handling
│   └── validator.js         # Request validation rules
├── models/
│   ├── schemas/
│   │   ├── jobSchema.js     # Mongoose job schema
│   │   ├── applicationSchema.js
│   │   └── contactSchema.js
│   ├── jobModel.js          # Job model with business methods
│   ├── applicationModel.js
│   └── contactModel.js
├── routes/
│   ├── jobRoutes.js         # Job API routes
│   ├── applicationRoutes.js
│   └── contactRoutes.js
├── .env                     # Environment variables (not in git)
├── .env.example             # Environment variables template
├── .gitignore
├── package.json
├── server.js                # Application entry point
└── README.md
```

## 🔒 Security Features

- **Helmet.js** - Sets various HTTP headers for security
- **CORS** - Configured to allow specific origins
- **Input Validation** - All user inputs are validated and sanitized
- **Error Handling** - Sensitive error details hidden in production
- **MongoDB Injection Protection** - Mongoose provides built-in protection

## ✅ Validation Rules

### Job Application
- Full name: 2-100 characters
- Email: Valid email format
- Phone: 10-digit Indian phone number (starts with 6-9)
- Job title: Required
- Experience: Max 50 characters
- Qualification: Max 100 characters
- Cover letter: Max 1000 characters

### Contact Form
- Name: 2-100 characters
- Email: Valid email format
- Phone: 10-digit Indian phone number (optional)
- Subject: 5-200 characters
- Message: 10-2000 characters

### Job Creation
- Title: 3-200 characters
- Location: Max 100 characters
- Salary: Required, max 100 characters
- Qualification: Required, max 200 characters
- Experience: Required, max 100 characters
- Key Skills: Required, max 300 characters
- Description: Max 2000 characters (optional)

## 🗄️ Database Schema

### Job Schema
```javascript
{
  title: String (required),
  location: String (required),
  salary: String (required),
  qualification: String (required),
  experience: String (required),
  keySkills: String (required),
  description: String,
  category: String (default: 'General'),
  type: String (enum: Full-time, Part-time, Contract, Internship, Remote),
  isActive: Boolean (default: true),
  postedDate: Date (default: now),
  timestamps: true
}
```

### Application Schema
```javascript
{
  fullName: String (required),
  email: String (required),
  phone: String (required),
  jobTitle: String (required),
  jobId: ObjectId (ref: Job),
  experience: String,
  qualification: String,
  coverLetter: String,
  resumeUrl: String,
  status: String (enum: pending, reviewed, shortlisted, rejected, accepted),
  appliedDate: Date (default: now),
  timestamps: true
}
```

### Contact Schema
```javascript
{
  name: String (required),
  email: String (required),
  phone: String,
  subject: String (required),
  message: String (required),
  status: String (enum: unread, read, replied),
  timestamps: true
}
```

## 🐛 Error Handling

All errors are handled by a global error handler that returns:

```json
{
  "success": false,
  "error": "Error message",
  "stack": "Stack trace (only in development)"
}
```

## 📦 Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **dotenv** - Environment variable management
- **cors** - Cross-Origin Resource Sharing
- **helmet** - Security headers
- **morgan** - HTTP request logger
- **express-validator** - Request validation
- **compression** - Response compression
- **axios** - HTTP client (for external API calls)

## 🔧 Development Dependencies

- **nodemon** - Auto-restart server on file changes

## 🚀 Deployment

### MongoDB Atlas Setup
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Create a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for all IPs)
5. Get your connection string
6. Update `MONGODB_URI` in `.env`

### Environment Setup
- Set `NODE_ENV=production`
- Update `FRONTEND_URL` to your production frontend URL
- Ensure all environment variables are properly configured

## 📞 Support

For support, email: info@growwyou.com
Website: https://www.growwyou.com

## 📄 License

ISC

---

**Made with ❤️ by GrowwYou Team**
