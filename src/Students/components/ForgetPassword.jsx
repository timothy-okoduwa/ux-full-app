import React, { useState,useEffect } from 'react';
import '../pages/SignPage/Sign.css';
import l from './images/TEXT.png';
import { Link,useNavigate } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import CircularProgress from '@mui/material/CircularProgress';
const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [loading,setLoading]= useState(false)
  const [error, setError] = useState(null);
const navigate = useNavigate()
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const auth = getAuth();

  const handleResetPassword = async () => {
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      console.log('Password reset email sent');
      setResetSent(true);
      setEmail('');
       setLoading(false)
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    let intervalId;
    if (resetSent) {
      intervalId = setInterval(() => {
        navigate('/signin');
      }, 7000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [resetSent]);

  return (
    <div>
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
                <div className="fpp">Forgot Password?</div>
                <div className="to">
                  To retrieve your account, enter your Email address
                </div>

                <div>
                  <div className="mt-5">
                    <div className="email">Email</div>
                    <input
                      type="email"
                      className="huntimg"
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </div>
                  <div>
                    {resetSent ? (
                      <div className="reset-message">
                        Password reset email sent. Please check your inbox.
                      </div>
                    ) : (
                      <button className="ssif" onClick={handleResetPassword}>
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
                    )}
                    {error && <div className="reset-message">{error}</div>}
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
    </div>
  );
};

export default ForgetPassword;
