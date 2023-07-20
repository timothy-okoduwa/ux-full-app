import React from 'react';
import Fotter from './Students/components/Fotter';
import NavBar from './Students/components/navBar/NavBar';
import LandingPage from './Students/pages/LandingPage/LandingPage';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CoursePage from './Students/pages/CoursesPage/CoursePage';
import CourseCategories from './Students/pages/CoursesPage/CourseCategories';
import CoursePreview from './Students/pages/CoursesPage/CoursePreview';
import SignUp from './Students/pages/SignPage/SignUp';
import ScrollToTop from './ScrollToTop';
import SignIn from './Students/pages/SignPage/SignIn';
import ForgetPassword from './Students/components/ForgetPassword';
import AdminSignUp from './Admin/Logs/SignUp';
import AdminSignIn from './Admin/Logs/SignIn';
import Confirm from './Students/components/Confirm';
import PurchaseCourse from './Students/components/PurchaseCourse';
import DashBoard from './Students/pages/DashBoard/DashBoard';
import StartWatching from './Students/pages/DashBoard/StartWatching';
import { UserAuthContextProvider } from './Students/components/context/UserAuthContext';
import ProtectedRoute from './Students/components/wow/ProtectedRoute';
import Settings from './Students/pages/Settings/Settings';
import Dashboard2 from './Admin/Dashboard2/Dashboard2';
import PurHist from './Admin/PurchasedHistory/PurHist';
import UpAll from './Admin/Upload/Upload';
import CourseHolder from './Admin/Upload/CourseHolder';
import { CourseProvider } from './Admin/Upload/CourseContext';
import ProtectedRoute2 from './Admin/Pro/ProtectedRoute2';
import CourseAll from './Admin/CourseManager/CourseAll';
import EditCourse from './Admin/EditCourse/EditCourse';
import Nothing from './Admin/Nothing/Nothing';
import ComingSoon from './Admin/CourseManager/ComingSoon';
import SeeAllComingSoon from './Admin/CourseManager/SeeAllComingSoon';
import Webinars from './Students/pages/Webinars/Webinars';
import UpComingWebinarDetails from './Students/components/UpComingWebinarDetails';
import Webinarr from './Admin/Webinarr/Webinarr';
import UploadUpcomingWebinar from './Admin/Webinarr/UploadUpcomingWebinar';
import PastWebinar from './Admin/Webinarr/PastWebinar';
import PastWebinarDetails from './Students/components/PastWebinarDetails';
import AllPastWebinar from './Students/components/AllPastWebinar';
function App() {
  return (
    <UserAuthContextProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </UserAuthContextProvider>
  );
}

function AppContent() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/course" element={<CoursePage />} />
        <Route
          path="/webinar-details/:upComingId"
          element={<UpComingWebinarDetails />}
        />
        <Route
          path="/PastWebinarDetails/:upComingId"
          element={<PastWebinarDetails />}
        />
        <Route path="/webinars" element={<Webinars />} />
        <Route path="/course-category" element={<CourseCategories />} />
        <Route path="/allpastwebinar" element={<AllPastWebinar />} />
        <Route path="/course-preview/:courseId" element={<CoursePreview />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forget" element={<ForgetPassword />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route
          path="/admin-dash"
          element={
            <ProtectedRoute2>
              <Dashboard2 />
            </ProtectedRoute2>
          }
        />
        <Route path="/purchase-course/:courseId" element={<PurchaseCourse />} />
        <Route
          path="/purchase-History"
          element={
            <ProtectedRoute2>
              <PurHist />
            </ProtectedRoute2>
          }
        />
        <Route
          path="/webinarr"
          element={
            <ProtectedRoute2>
              <Webinarr />
            </ProtectedRoute2>
          }
        />
        <Route
          path="/upcomingwebinar"
          element={
            <ProtectedRoute2>
              <UploadUpcomingWebinar />
            </ProtectedRoute2>
          }
        />
        <Route
          path="/uploadpast"
          element={
            <ProtectedRoute2>
              <PastWebinar />
            </ProtectedRoute2>
          }
        />
        <Route
          path="/courses"
          element={
            <ProtectedRoute2>
              <CourseAll />
            </ProtectedRoute2>
          }
        />
        <Route
          path="/seeall"
          element={
            <ProtectedRoute2>
              <SeeAllComingSoon />
            </ProtectedRoute2>
          }
        />
        <Route
          path="/coming-soon"
          element={
            <ProtectedRoute2>
              <ComingSoon />
            </ProtectedRoute2>
          }
        />
        <Route path="/admin-signup" element={<AdminSignUp />} />
        <Route path="/admin-signin" element={<AdminSignIn />} />
        <Route
          path="/uploads"
          element={
            <CourseProvider>
              <UpAll />
            </CourseProvider>
          }
        />

        <Route
          path="/chh"
          element={
            <CourseProvider>
              <CourseHolder />{' '}
            </CourseProvider>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit/:courseId"
          element={
            <ProtectedRoute>
              <EditCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/start-watching/:courseId"
          element={
            <ProtectedRoute>
              <StartWatching />
            </ProtectedRoute>
          }
        />
        <Route
          path="/setting"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Nothing />} />
      </Routes>
      <Fotter />
      <ScrollToTop />
    </>
  );
}

export default App;
