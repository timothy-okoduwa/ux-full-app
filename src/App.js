import Fotter from './components/Fotter';
import NavBar from './components/navBar/NavBar';
import LandingPage from './pages/LandingPage/LandingPage';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CoursePage from './pages/CoursesPage/CoursePage';
import CourseCategories from './pages/CoursesPage/CourseCategories';
import CoursePreview from './pages/CoursesPage/CoursePreview';
import SignUp from './pages/SignPage/SignUp';
import ScrollToTop from './ScrollToTop';
import SignIn from './pages/SignPage/SignIn';
import ForgetPassword from './components/ForgetPassword';
import Verify from './components/Verify';
import Confirm from './components/Confirm';
import PurchaseCourse from './components/PurchaseCourse';
import DashNav from './components/navBar/DashNav';
import DashBoard from './pages/DashBoard/DashBoard';
import StartWatching from './pages/DashBoard/StartWatching';
import { UserAuthContextProvider } from './components/context/UserAuthContext';
import ProtectedRoute from './components/wow/ProtectedRoute';
import Settings from './pages/Settings/Settings';
function App() {
  return (
    <UserAuthContextProvider>
      <BrowserRouter>
        <NavBar />
        <DashNav />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/course" element={<CoursePage />} />
          <Route path="/course-category" element={<CourseCategories />} />
          <Route path="/course-preview" element={<CoursePreview />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/forget" element={<ForgetPassword />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/confirm" element={<Confirm />} />
          <Route path="/purchase-course" element={<PurchaseCourse />} />
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
