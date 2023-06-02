import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { IoIosWarning } from 'react-icons/io';
import CircularProgress from '@mui/material/CircularProgress';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { collection, doc, updateDoc } from 'firebase/firestore';
const SignInFunction = () => {
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
    error: null,
    loading: false,
  });
  const { email, password, error, loading } = data;
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const LogingIn = async () => {
    setData({ ...data, error: null, loading: true });
    if (!email || !password) {
      setData({ ...data, error: 'all fields are required' });
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);

      const currentUser = auth.currentUser;
      if (currentUser) {
        const studentCollection = collection(db, 'student');
        const studentDocumentReference = doc(
          studentCollection,
          currentUser.uid
        );
        await updateDoc(studentDocumentReference, {
          isOnLine: true,
          password: password,
          confirmPassword: password,
        });
      }
       setShowSuccessMessage(true);

       setTimeout(() => {
         navigate('/dashboard');
       }, 2000);
      setData({
        email: '',
        password: '',
        error: null,
        loading: false,
      });
    } catch (err) {
      switch (err.code) {
        case 'auth/invalid-email':
          setData({
            ...data,
            error: 'all fields are required.',
            loading: false,
          });
          break;
        case 'auth/user-disabled':
          setData({
            ...data,
            error:
              'Your account has been disabled,contact the super Admin for help.',
            loading: false,
          });
          break;
        case 'auth/user-not-found':
          setData({
            ...data,
            error: 'You dont have an account yet,please sign up.',
            loading: false,
          });
          break;
        case 'auth/too-many-requests':
          setData({
            ...data,
            error:
              'you have exhusted the maxium trial limit, come back 10 min later. ',
            loading: false,
          });
          break;

        case 'auth/wrong-password':
          setData({
            ...data,
            error: 'You have entered a wrong password. ',
            loading: false,
          });
          break;

        default:
          setData({ ...data, error: err.message, loading: false });
          break;
      }
    }
  };
  useEffect(() => {
    // Show the error message
    setShowError(true);

    // Set a timer to hide the error message after 5 seconds
    const timer = setTimeout(() => {
      setShowError(false);
    }, 5000);

    // Clean up the timer when the component is unmounted or when the error changes
    return () => {
      clearTimeout(timer);
    };
  }, [error]);
  const move = () => {
    navigate('/forget');
  };

  return (
    <div>
      <div>
        <div className="create">Welcome Back</div>
        <div className="mt-4">
          {error ? (
            <div className={`fun ${showError ? 'show' : 'hide'}`}>
              <span className="ivon">
                <IoIosWarning />
              </span>{' '}
              {error}
            </div>
          ) : null}

          {showSuccessMessage && (
            <div className="fun2">
              <span className="ivon">
                <BsFillCheckCircleFill />
              </span>{' '}
              You have successfully signed in.
            </div>
          )}
          <div className="mt-5">
            <div className="full">Email</div>
            <input
              type="email"
              className="ingame"
              value={email}
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="mt-5">
            <div className="full">Create Password</div>
            <input
              type="password"
              className="ingame"
              value={password}
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className="forgert" onClick={move}>
            Forgot Password?
          </div>

          <div className="mt-5">
            <div className="already">
              I don’t have an account?{' '}
              <Link to="/signup" style={{ textDecoration: 'none' }}>
                <span className="signg">Sign Up</span>
              </Link>
            </div>

            <div>
              <button
                className="ssif"
                onClick={LogingIn}
                disabled={loading || !email || !password}
              >
                {' '}
                {loading ? (
                  <CircularProgress
                    style={{ color: 'white', height: '27px', width: '27px' }}
                  />
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInFunction;
