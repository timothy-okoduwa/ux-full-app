import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase';
import {  collection, doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
const SignUpFunction = () => {
  const navigate=useNavigate()
  const [data, setData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword:'',
    error: null,
    loading: false,
    isOnLine:true,
  });
  const {
    fullName,
    email,
    password,
    error,
    loading,
    confirmPassword,
    isOnLine,
  } = data;
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const createUserAccount = async () => {
    setData({ ...data, error: null, loading: true });
    if (!email || !password) {
      setData({ ...data, error: 'All fields are required' });
    }
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const studentCollection = collection(db,'student');
      const studentDocumentReference = doc(studentCollection,user.uid)
   await setDoc(studentDocumentReference, {
     fullName: fullName,
     uid: user.uid,
     email: email,
     password: password,
     confirmPassword: confirmPassword,
     isOnLine: isOnLine,
   });
   navigate('/dashboard');
      setData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: null,
        loading: false,
        isOnLine:true,
      });
    } catch (err) {
      switch (err.code) {
        case 'auth/invalid-email':
          setData({
            ...data,
            error: 'All fields are required.',
            loading: false,
          });
          break;
        case 'auth/user-disabled':
          setData({
            ...data,
            error:
              'Your account has been disabled,contact the super Admin for help',
            loading: false,
          });
          break;
        case 'auth/weak-password':
          setData({
            ...data,
            error:
              'weak password, password should be at least 6 characters long',
            loading: false,
          });
          break;
        case 'auth/email-already-in-use':
          setData({
            ...data,
            error: 'This email is already used by an admin. ',
            loading: false,
          });
          break;
        case 'auth/too-many-requests':
          setData({
            ...data,
            error:
              'you have exhusted the maxium trial limit, come back 1hr later ',
            loading: false,
          });
          break;

        case 'auth/wrong-password':
          setData({
            ...data,
            error: 'Invalid password.',
            loading: false,
          });
          break;
        default:
          setData({ ...data, error: err.message, loading: false });
          break;
      }
    }
  };
  return (
    <div>
      <div className="create">Create an account</div>
      <div className="mt-4">
        {error ? (
          <Alert severity="error" className="fun">
            {error}
          </Alert>
        ) : null}

        <div className="mt-5">
          <div className="full">Fullname</div>
          <input
            type="name"
            className="ingame"
            name="fullName"
            value={fullName}
            onChange={handleChange}
          />
        </div>
        <div className="mt-5">
          <div className="full">Email</div>
          <input
            type="email"
            className="ingame"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="mt-5">
          <div className="full">Create password</div>
          <input
            type="password"
            className="ingame"
            value={password}
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className="mt-5">
          <div className="full">Confirm password</div>
          <input
            type="password"
            className="ingame"
            value={confirmPassword}
            name="confirmPassword"
            onChange={handleChange}
          />
        </div>
        <div className="mt-5">
          <div className="already">
            Already have an account?{' '}
            <Link to="/signin" style={{ textDecoration: 'none' }}>
              <span className="signg">Sign in</span>
            </Link>
          </div>

          <div className="bysign">
            By signing up or creating an account, you agree to our Privacy
            <br />
            Policy and Terms of Service.
          </div>
          <div>
            <button
              className="ssif"
              onClick={createUserAccount}
              disabled={loading || !fullName || !email || !password}
            >
              {' '}
              {loading ? (
                <CircularProgress
                  style={{ color: 'white', height: '27px', width: '27px' }}
                />
              ) : (
                'sign up'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpFunction;
