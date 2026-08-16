# Student Admission System

A full-stack web application designed to streamline the student admission process. Built with the MERN stack (MongoDB, Express, React, Node.js), this system provides an intuitive interface for students to apply for courses and for administrators to manage applications securely and efficiently.

## 🚀 Features

- **User Authentication:** Secure login and registration using JWT (JSON Web Tokens) and bcrypt for password hashing. Also supports Google OAuth.
- **Role-Based Access Control:** Distinct dashboards and permissions for Administrators and Students.
- **Application Management:** Students can submit, track, and manage their admission applications.
- **Course Management:** Admins can manage available courses and admission criteria.
- **File Uploads:** Integrated file uploading capabilities (using Multer) for document submissions.
- **Responsive UI:** A modern, fully responsive frontend built with React and Vite.

## 🛠️ Tech Stack

### Frontend
- **React.js** (Bootstrapped with Vite)
- **Redux Toolkit** (State Management)
- **React Router DOM** (Routing)
- **Axios** (API Requests)

### Backend
- **Node.js & Express.js** (RESTful API architecture)
- **MongoDB & Mongoose** (Database & ORM)
- **JWT & Bcryptjs** (Authentication & Security)
- **Multer** (File Handling)
- **Nodemailer** (Email notifications)

## ⚙️ Installation & Setup

### Prerequisites
- Node.js
- MongoDB (Local or Atlas)

### 1. Clone the Repository
```bash
git clone https://github.com/Sorojeet-Bhowmick/Student_Admission_System.git
cd Student_Admission_System
```

### 2. Backend Setup
```bash
cd backend
npm install
```
- Create a `.env` file in the `backend` directory with your environment variables (e.g., `PORT`, `MONGO_URI`, `JWT_SECRET`).
- Start the development server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
npm install
```
- Start the Vite development server:
```bash
npm run dev
```

## 📝 License
This project is open-source and available under the ISC License.