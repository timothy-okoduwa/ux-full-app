import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="fix-that">
      <div className="container">
        <div className=" class">
          <div className="row">
            <div className="col-12 col-lg-8 ">
              <div className="learn">
                Learn UX <br />
                Design Today
              </div>
              <div className="starts">
                Start Designing Products that serves people,
                <br /> serves businesses from experts
              </div>
              <div className="anoy">
                <Link to="/course" style={{ textDecoration: 'none' }}>
                  <button className="Browse">Browse Courses</button>
                </Link>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className=""></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
