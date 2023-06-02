import React from 'react'
import { Link } from 'react-router-dom';
const UxResearch = () => {
  return (
    <div className="res">
      <div className="container">
        <div className="uxx">UX Research</div>
        <div className="row mt-5">
          <div className="col-12 col-lg-3 mb-5">
            <div>
              <div className="fakse">
                <div className="dem"></div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-3 mb-5">
            <div>
              <div className="fakse2">
                <div className="dem"></div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-3 mb-5">
            <div>
              <div className="fakse">
                <div className="dem"></div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-3 mb-5">
            <div>
              <div className="fakse2">
                <div className="dem"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <Link to="/course-category">
            <button className="view">VIEW MORE</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UxResearch