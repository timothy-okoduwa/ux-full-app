import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import {
  getAuth,
  verifyPasswordResetCode,
  confirmPasswordReset,
} from 'firebase/auth';
import '../pages/SignPage/Sign.css';
import l from './images/TEXT.png';
import man from '../pages/images/man-pouting.png';
import thumb from '../pages/images/party-popper.png';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
const Confirm = () => {
  const location = useLocation();
  const [resetCodeValid, setResetCodeValid] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [resetCompleted, setResetCompleted] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // Extract the password reset code from the URL query parameters
    const searchParams = new URLSearchParams(location.search);
    const resetCode = searchParams.get('oobCode');

    // Verify the password reset code using Firebase Auth SDK
    const auth = getAuth();
    verifyPasswordResetCode(auth, resetCode)
      .then(() => setResetCodeValid(true))
      .catch((error) => setError(error.message));
  }, [location.search]);

const handlePasswordReset = () => {
  const auth = getAuth();
  setLoading(true);
  const searchParams = new URLSearchParams(location.search);
  const resetCode = searchParams.get('oobCode');

  // Reset the user's password using Firebase Auth SDK
  confirmPasswordReset(auth, resetCode, newPassword)
    .then(() => {
      // Update the password and confirmPassword fields in the document
      if (auth.currentUser) {
        const studentDocRef = doc(db, 'student', auth.currentUser.uid);
        updateDoc(studentDocRef, {
          password: newPassword,
          confirmPassword: confirmNewPassword,
        });
      }

      setResetCompleted(true);
    })
    .catch((error) => {
      setError(error.message);
      console.log('Password reset error:', error);
    });
};



  if (resetCompleted) {
    return (
      <div>
        <div className="golden">
          <div className="container">
            <div className="dripp">
              <div className=" whishh">
                <div className="container">
                  <div className="fpp">Congratulations </div>
                  <div className="d-flex justify-content-center align-item-center mt-4">
                    <img src={thumb} alt="phohh" style={{ width: '25%' }} />
                  </div>
                  <div>
                    <p className="invalid-link">
                      Your password has been reset.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="cpry">
              2022 Copyright | Email: enquires@uxdesignmaster.com
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      {resetCodeValid ? (
        <div className="golden">
          <div className="container">
            <div>
              <div className=" d-flex justify-content-start mb-5">
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <img src={l} alt="" />
                </Link>
              </div>
            </div>

            <div className="dripp">
              <div className=" whishh">
                <div className="container">
                  <div className="fpp">New Password</div>
                  <div className="to">Enter your new password</div>

                  <div>
                    <div className="mt-5">
                      <div className="email">Password</div>
                      <input
                        className="huntimg"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    <div className="mt-3">
                      <div className="email">Confirm Password</div>
                      <input
                        className="huntimg"
                        type="password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                      />
                    </div>
                    <div>
                      <button className="ssif" onClick={handlePasswordReset}>
                        {loading ? (
                          <CircularProgress
                            style={{
                              color: 'white',
                              height: '27px',
                              width: '27px',
                            }}
                          />
                        ) : (
                          'Submit'
                        )}
                      </button>
                      {error && <p>{error}</p>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="cpry">
              2022 Copyright | Email: enquires@uxdesignmaster.com
            </div>
          </div>
        </div>
      ) : (
        <div className="golden">
          <div className="container">
            <div className="dripp">
              <div className=" whishh">
                <div className="container">
                  <div className="fpp">oops </div>
                  <div className="d-flex justify-content-center align-item-center mt-4">
                    <img src={man} alt="phohh" style={{ width: '25%' }} />
                  </div>
                  <div>
                    <p className="invalid-link">Invalid or expeired password reset link.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="cpry">
              2022 Copyright | Email: enquires@uxdesignmaster.com
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Confirm;
