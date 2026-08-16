import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/shared/Navbar.jsx";
import Footer from "./components/shared/Footer.jsx";
import ProtectedRoute from "./components/shared/ProtectedRoute.jsx";
import Home from "./pages/public/Home.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import VerifyOTP from "./pages/auth/VerifyOTP.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";
import ResetPassword from "./pages/auth/ResetPassword.jsx";
import Dashboard from "./pages/student/Dashboard.jsx";
import Enquiries from "./pages/admin/Enquiries.jsx";
import Courses from "./pages/public/Courses.jsx";
import About from "./pages/public/About.jsx";
import ApplyAdmission from "./pages/public/ApplyAdmission.jsx";
import TrackStatus from "./pages/public/TrackStatus.jsx";
import AdminCourses from "./pages/admin/Courses.jsx";
import AdminApplications from "./pages/admin/Applications.jsx";
import Academics from "./pages/public/Academics.jsx";
import CourseDetail from "./pages/public/CourseDetail.jsx";
import Placements from "./pages/public/Placements.jsx";
import Blogs from "./pages/public/Blogs.jsx";
import AdminBlogs from "./pages/admin/Blogs.jsx";
import AdminUsers from "./pages/admin/AdminUsers.jsx";

function App() { 
  const location = useLocation();
  const isAuthRoute = ["/login", "/register", "/verify-otp", "/forgot-password", "/reset-password"].includes(location.pathname);

  return (
    <div className="app-shell">
      {!isAuthRoute && <Navbar />}
      <main className={isAuthRoute ? "auth-main-layout" : "standard-main-layout"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/academics/:courseId" element={<CourseDetail />} />
          <Route path="/placements" element={<Placements />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/apply" element={<ApplyAdmission />} />
          <Route path="/track-status" element={<TrackStatus />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/enquiries" element={<ProtectedRoute adminOnly={true}><Enquiries /></ProtectedRoute>} />
          <Route path="/admin/courses" element={<ProtectedRoute adminOnly={true}><AdminCourses /></ProtectedRoute>} />
          <Route path="/admin/applications" element={<ProtectedRoute adminOnly={true}><AdminApplications /></ProtectedRoute>} />
          <Route path="/admin/blogs" element={<ProtectedRoute adminOnly={true}><AdminBlogs /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute adminOnly={true}><AdminUsers /></ProtectedRoute>} />
        </Routes>
      </main>
      {!isAuthRoute && <Footer />}
    </div>
  ); 
}

export default App;


