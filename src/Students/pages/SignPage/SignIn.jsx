import React from 'react';
import './Sign.css';
import l from '../../components/images/TEXT.png';
import { Link } from 'react-router-dom';
import SignRight from '../../components/SignRight';
import SignInFunction from '../../components/SignInFunction';
const SignIn = () => {
  return (
    <div className="golden">
      <div className="container">
        <div>
          <div className=" d-flex justify-content-start mb-5">
            <Link to="/" style={{ textDecoration: 'none' }}>
              <img src={l} alt="" />
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-lg-6">
            <div>
              <SignInFunction />
            </div>
          </div>
          <div className="col-12 col-lg-6 financre">
            <div>
              <SignRight />
            </div>
          </div>
        </div>
        <div className="cpry">
          2022 Copyright | Email: enquires@uxdesignmaster.com
        </div>
      </div>
    </div>
  );
};

export default SignIn;
