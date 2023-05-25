import React from 'react';
import '../pages/SignPage/Sign.css';
import l from './images/TEXT.png';
import { Link } from 'react-router-dom';
const Verify = () => {
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
                <div className="fpp">Verification Pin</div>
                <div className="to">
                  We sent a security code to your email. Enter the pin to
                  proceed.
                </div>

                <div>
                  <div className="mt-5">
                    <div className="email">Pin</div>
                    <input type="text" className="huntimg" />
                  </div>
                  <div className="mt-4">
                    <span className="estate">I didn’t receive any code. </span>{' '}
                    <span className="resednd"> Resend</span>
                  </div>
                  <div>
                    <Link to="/confirm" style={{ textDecoration: 'none' }}>
                      <button className="ssif">Submit</button>
                    </Link>
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

export default Verify;
