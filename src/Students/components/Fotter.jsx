import React from 'react';
import t from './images/TEXT.png';
import { useLocation, Link } from 'react-router-dom';
import { BsInstagram, BsFacebook, BsTwitter } from 'react-icons/bs';
const Fotter = () => {
  const location = useLocation();

  const hideAllFotter =
    location.pathname === '/signup' ||
    location.pathname === '/signin' ||
    location.pathname === '/verify' ||
    location.pathname === '/confirm' ||
    location.pathname === '/setting' ||
    location.pathname === '/admin-dash' ||
    location.pathname === '/purchase-History' ||
    location.pathname === '/uploads' ||
    location.pathname === '/dashboard' ||
    location.pathname === '/chh' ||
    location.pathname === '/coming-soon' ||
    location.pathname === '/uploadpast' ||
    location.pathname === '/seeall' ||
    location.pathname === '/upcomingwebinar' ||
    location.pathname === '/webinarr' ||
    location.pathname === '/rsvpwaitlist' ||
    location.pathname === '/admin-signup' ||
    location.pathname === '/admin-signin' ||
    location.pathname === '/courses' ||
    location.pathname.startsWith('/edit') ||
    location.pathname.startsWith('/purchase-course') ||
    location.pathname.startsWith('/start-watching') ||
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
              {/* course-category?category=UI%20Design */}
              <div className="col-12 col-lg-3 mb-5">
                <div>
                  <Link to="/course" style={{ textDecoration: 'none' }}>
                    <div className="body">Courses</div>
                  </Link>
                  <Link
                    to="/course-category?category=UI Design"
                    style={{ textDecoration: 'none' }}
                  >
                    <div className="body">Categories</div>
                  </Link>

                  <Link to="/webinars" style={{ textDecoration: 'none' }}>
                    <div className="body">Webinar</div>
                  </Link>

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
          <div className="mt-4">
            <hr style={{ color: 'white' }} />
          </div>
          <div className="container cioieie">
            <div className="row">
              <div className="col-12 col-md-4">
                <div className="mader">
                  Made With ❤️ In Nigeria |{' '}
                  <a
                    href="https://vestarplus.com/"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      textDecoration: 'none',
                      color: 'white',
                      fontWeight: '500',
                    }}
                  >
                    A Product Of VestarPlus
                  </a>
                </div>
              </div>
              <div className="col-12 col-md-5">
                {' '}
                <div className="twenty">
                  2022 Copyright | Email: enquires@uxdesignmaster.com
                </div>
              </div>
              <div className="col-12 col-md-3  swiede">
                <div>
                  <BsInstagram className="apolo" />
                  <BsFacebook className="apolo" />
                  <BsTwitter className="apolo" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Fotter;
