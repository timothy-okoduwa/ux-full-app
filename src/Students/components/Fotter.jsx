import React from 'react';
import t from './images/TEXT.png';
import { useLocation } from 'react-router-dom';
const Fotter = () => {
  const location = useLocation();

  const hideAllFotter =
    location.pathname === '/signup' ||
    location.pathname === '/signin' ||
    location.pathname === '/verify' ||
    location.pathname === '/confirm' ||
    location.pathname === '/admin-dash' ||
    location.pathname === '/purchase-History' ||
    location.pathname === '/uploads' ||
    location.pathname === '/chh' ||
    location.pathname === '/admin-signup' ||
    location.pathname === '/admin-signin' ||
    location.pathname === '/courses' ||
    location.pathname === '/edit' ||
    location.pathname === '/forget';
  return (
    <>
      {hideAllFotter ? null : (
        <div className="nogodey">
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-3 mb-5">
                <div>
                  <img src={t} alt="" />
                </div>
              </div>
              <div className="col-12 col-lg-3 mb-5">
                <div>
                  <div className="body">Courses</div>
                  <div className="body">Categories</div>
                  <div className="body">Podcast</div>
                  <div className="body">About us</div>
                  <div className="body">Contact</div>
                </div>
              </div>
              <div className="col-12 col-lg-3 mb-5">
                <div>
                  <div className="body">Security</div>
                  <div className="body">Privacy</div>
                  <div className="body">Terms</div>
                  <div className="body">
                    Teach at UX Design <br />
                    Master (coming soon)
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-3 mb-5">
                <div>
                  <div className="wantes">
                    Want latest update on new courses and news from the world of
                    Design
                  </div>
                  <div>
                    <input type="text" className="inini" placeholder="email" />
                    <div>
                      <button className="seb">Subscribe</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <hr style={{ color: 'white' }} />
          </div>
          <div className="twenty">
            2022 Copyright | Email: enquires@uxdesignmaster.com
          </div>
        </div>
      )}
    </>
  );
};

export default Fotter;
