# Internship Project Report

## Front Matter

**Project Name:** Student Admission System  
**Student Details:** [Insert Your Name/s Here]  
**Academic Details:** [Insert Your Degree and College Name Here]  
**Mentor Name:** [Insert Mentor Name Here, e.g., Saumitra Das]  

---

## Title of the Project
Student Admission System

## Introduction and Objectives of the Project
The Student Admission System is a comprehensive web-based application designed to automate and streamline the admission process for educational institutions. The primary objectives are:
- To provide a user-friendly online platform for students to submit admission applications, upload documents, and track their application status.
- To enable administrators to manage courses, review applications, and communicate with applicants efficiently.
- To reduce manual paperwork and administrative overhead.
- To ensure a secure, transparent, and fast admission procedure.

## Project Category
Web Application (MERN Stack)

## Tools/Platform, Hardware and Software Requirement specifications

**Software Requirements:**
- **Operating System:** Windows / Linux / macOS
- **Frontend Technologies:** React.js (Vite), Redux Toolkit, Custom CSS
- **Backend Technologies:** Node.js, Express.js
- **Database:** MongoDB
- **Development Tools:** VS Code, Git, Postman

**Hardware Requirements:**
- **Processor:** Intel Core i3 or higher
- **RAM:** 4 GB (8 GB recommended)
- **Storage:** Minimum 10 GB free space
- **Internet Connection:** Required for deployment and API testing

## Goals of Implementation
- Digitize the entire admission workflow from inquiry to enrollment.
- Implement role-based access control (Admin, Student).
- Integrate an automated email notification system for status updates and OTP verification.
- Provide a robust dashboard for administrators to analyze admission trends.

## SDLC Process Applied
Agile Methodology with Prototyping Paradigm. The system was developed iteratively, allowing for regular feedback and refinement of features like the application form and admin dashboard.

## Data Model
*(Insert ER Diagrams here)*
The primary entities in the system include:
- **User/Student:** Stores authentication details, personal info, and profile data.
- **Application:** Links a student to a course, storing academic records and application status (Pending, Approved, Rejected).
- **Course:** Details of available courses, eligibility criteria, and fees.
- **Enquiry/Blog:** For pre-admission queries and informational updates.

## Functional Requirements
- **User Authentication:** Registration, Login, Password Reset via OTP.
- **Course Browsing:** Users can view available courses and their details.
- **Application Submission:** Students can fill out admission forms and upload necessary documents.
- **Admin Dashboard:** Admins can view, approve, or reject applications.
- **Notifications:** Automated email alerts for application status changes.

## Non-functional Requirements
- **Performance:** The system should load quickly and handle concurrent users during peak admission seasons.
- **Security:** Passwords must be hashed (bcrypt), and APIs must be secured using JWT authentication.
- **Usability:** The interface should be intuitive and responsive across devices.
- **Reliability:** High uptime and secure database backups.

## Feasibility Study
- **Technical Feasibility:** The MERN stack provides all necessary tools to build a scalable and responsive application.
- **Economic Feasibility:** The project uses open-source technologies, eliminating licensing costs.
- **Operational Feasibility:** The automated system is easy for both staff and students to learn and operate, reducing administrative load.

## Project Planning and Scheduling
*(Insert Gantt chart here)*
- **Phase 1:** Requirement Analysis & UI/UX Design (Weeks 1-2)
- **Phase 2:** Database Design & Backend API Development (Weeks 3-5)
- **Phase 3:** Frontend Development & Integration (Weeks 6-8)
- **Phase 4:** Testing & Bug Fixing (Week 9)
- **Phase 5:** Deployment & Documentation (Week 10)

## Software Engineering Paradigm applied & Data Flow Diagram (DFD)
*(Insert DFD Level 0 and Level 1 diagrams here)*
The project follows a component-based architecture using React and a RESTful API structure on the backend. 
- **Level 0 DFD:** Shows the entire system interacting with External Entities (Student, Admin).
- **Level 1 DFD:** Breaks down the system into core processes like Authentication, Application Management, and Course Management.

## Database/Schema Design
The project utilizes MongoDB (NoSQL) with Mongoose ORM.
- **User Collection:** `_id`, `name`, `email`, `password`, `role` (admin/user), `createdAt`.
- **Student Collection:** Links to User, contains personal details, academic history.
- **Course Collection:** `courseId`, `title`, `description`, `duration`, `fees`.
- **Application Collection:** `studentId`, `courseId`, `status`, `documents`, `submissionDate`.

## User Interface Design
*(Insert Wireframes and UI Screenshots here)*
The UI is designed to be clean and modern. Key interfaces include:
- Public landing page with course listings and blogs.
- Student portal for submitting and tracking applications.
- Admin dashboard with data tables and application management controls.

## Coding
**Frameworks Used:**
- **Frontend:** React.js (Vite), Redux for state management, Axios for API calls.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB via Mongoose.
- **Authentication:** JWT (JSON Web Tokens), Google OAuth integration.

## Testing
- **Unit Testing:** Individual components and API endpoints were tested using Postman.
- **Integration Testing:** Ensuring the frontend correctly communicates with backend APIs.
- **Black Box Testing:** Testing the application from an end-user perspective (form validations, navigation).
- **Test Cases:** Covered login failures, duplicate application submissions, and unauthorized access attempts.

## System Security Measures
- Route protection using React Router for frontend.
- Express Rate Limiting to prevent brute-force attacks.
- Helmet.js for securing HTTP headers.

## Database/Data Security
- MongoDB connection is secured via environment variables (`.env`).
- Sensitive data like passwords are encrypted using `bcryptjs` before storage.
- Document uploads are validated to prevent malicious file execution.

## Creation of User profiles and access rights
- **Guest:** Can view courses and blogs.
- **Student (User):** Can register, submit applications, and view status.
- **Admin:** Has full access to manage courses, review applications, and update content. Access is strictly governed by JWT role verification.

## Cost Estimation of the Project along with Cost Estimation Model
The project relies on open-source tools. Estimated operational costs involve server hosting and database hosting (MongoDB Atlas), which typically fall under free tiers for standard academic projects. The cost model relies on zero-cost licensing and free-tier cloud deployment models.

## Reports
*(Insert Sample Report Layouts here)*
- Application Summary Report for Admins.
- Fee Payment Receipt / Acknowledgement for Students.

## Future scope and further enhancement of the Project
- Integration of a payment gateway (e.g., Razorpay, Stripe) for online fee collection.
- Implementation of a real-time chat support system for applicants.
- AI-based document verification to automatically validate uploaded mark sheets.

## Bibliography
- React.js Documentation: https://reactjs.org/
- Express.js Documentation: https://expressjs.com/
- MongoDB Documentation: https://www.mongodb.com/docs/
- Node.js Documentation: https://nodejs.org/docs/
