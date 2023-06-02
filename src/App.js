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

import Confirm from './Students/components/Confirm';
import PurchaseCourse from './Students/components/PurchaseCourse';
// import DashNav from './components/navBar/DashNav';
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
function App() {
  return (
    <UserAuthContextProvider>
      <BrowserRouter>
        <NavBar />
        {/* <DashNav /> */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/course" element={<CoursePage />} />
          <Route path="/course-category" element={<CourseCategories />} />
          <Route path="/course-preview" element={<CoursePreview />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/forget" element={<ForgetPassword />} />
          <Route path="/confirm" element={<Confirm />} />
          <Route path="/admin-dash" element={<Dashboard2 />} />
          <Route path="/purchase-course" element={<PurchaseCourse />} />
          <Route path="/purchase-History" element={<PurHist />} />
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
            path="/start-watching"
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
        </Routes>
        <Fotter />
        <ScrollToTop />
      </BrowserRouter>
    </UserAuthContextProvider>
  );
}

export default App;
