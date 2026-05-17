# Task Management System

A full-stack task management application built using the MERN stack.

## Features

### Authentication & Authorization

- JWT Authentication
- Login/Register
- Protected Routes
- Role-Based Access Control (Admin/User)

### Task Management

- Create Tasks
- Edit Tasks
- Delete Tasks
- Assign Tasks to Users
- Task Filtering
- Task Status Tracking
- Priority Management

### File Uploads

- Upload PDF documents
- Multiple PDF support
- View uploaded documents

### Admin Features

- View all users
- Update user roles
- Delete users

### Dashboard

- Task statistics
- Recent tasks
- Task status overview

### Backend Features

- RESTful APIs
- Swagger Documentation
- Docker Support
- Jest Testing
- MongoDB Atlas Integration

---

# Tech Stack

## Frontend

- React
- Vite
- TailwindCSS
- Redux Toolkit
- React Router
- Axios

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer
- Swagger
- Jest

---

# Project Structure

```bash
task-manager/
│
├── client/
├── server/
└── docker-compose.yml
```

---

# Installation

## Clone Repository

```bash
git clone <your-repository-url>
cd panscience-assignment
```

---

# Backend Setup

```bash
cd server
npm install
npm run dev
```

---

# Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

# Environment Variables

Create `.env` inside `server/`

```env
PORT=8000

MONGODB_URI=your_mongodb_uri

ACCESS_TOKEN_SECRET=your_secret
ACCESS_TOKEN_EXPIRY=1d

CORS_ORIGIN=http://localhost:5173
```

---

# Docker Setup

```bash
docker compose up --build
```

---

# API Documentation

Swagger Docs:

```bash
http://localhost:8000/api-docs
```

---

# Test APIs

```bash
cd server
npm test
```

---

# Screenshots

Add screenshots here before submission.

---

# Future Improvements

- Notifications
- Drag and Drop Tasks
- Real-time Updates
- Dark Mode
- Email Reminders

---

# Author

Satyam Singh
