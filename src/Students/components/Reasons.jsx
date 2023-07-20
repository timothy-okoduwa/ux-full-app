import React from 'react';
import t from '../pages/images/time.png';
import l from '../pages/images/learn.png';
import m from '../pages/images/mentor.png';
import cc from '../pages/images/career.png';
import s from '../pages/images/student.png';
import q from '../pages/images/questio.png';
import { Link } from 'react-router-dom';
const Reasons = () => {
  return (
    <div className="going">
      <div className="container">
        <div className="designed">Designed To Fit Your Schedule</div>
        <div className="four">
          <div className="row ">
            <div className="col-12 col-lg-4 mb-5">
              <div className="wiloo">
                <div>
                  <img src={t} alt="" />
                </div>
                <div className="Access mt-3">Access at your pace</div>
                <div className="hor mt-3">
                  Full time worker or student with less time? Don’t worry as our
                  classes are built for your convenience
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4 mb-5">
              <div className="wiloo">
                <div>
                  <img src={l} alt="" />
                </div>
                <div className="Access mt-3">Learn on the go</div>
                <div className="hor mt-3">
                  Access the class from either your mobile phone, tab or a
                  laptop. All you need is internet.
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4 mb-5">
              <div className="wiloo">
                <div>
                  <img src={m} alt="" />
                </div>
                <div className="Access mt-3">Mentoring & Feedback</div>
                <div className="hor mt-3">
                  Get steady feedback from your tutor. One on one chat is
                  enabled for free communication.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="four ">
          <div className="designed mb-5">Learning & Support</div>
          <div className="row ">
            <div className="col-12 col-lg-4 mb-5">
              <div className="wiloo">
                <div>
                  <img src={cc} alt="" />
                </div>
                <div className="Access mt-3">For Career Individual</div>
                <div className="hor mt-3">
                  The courses are design for people who are busy and trying to
                  learn form top designers. Either you are starting as a
                  freelancer or an in-house designer, we have amazing packages
                  lined up for you
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4 mb-5">
              <div className="wiloo">
                <div>
                  <img src={s} alt="" />
                </div>
                <div className="Access mt-3">For Students</div>
                <div className="hor mt-3">
                  Still in the university or secondary and would like to advance
                  your career? Our classes aree built not ot interfere with your
                  school activities, Come in anytime and continue learning.
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4 mb-5">
              <div className="wiloo">
                <div>
                  <img src={q} alt="" />
                </div>
                <div className="Access mt-3">Support</div>
                <div className="hor mt-3">
                  Tell us anytime you have any questions or feedback during the
                  program. We reply timely.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="aok">
          <div className="vide">
            <div className="container">
              <div className="row">
                <div className="col-12 col-lg-4">
                  <div className="trew">
                    <div className="watch22">
                      Watch Lessons. Anytime within minutes.
                    </div>
                    <div className="zone">
                      Learn on the go. Watch short videos on any topic you like.
                      Learn from experts in the field.
                    </div>
                  </div>
                  <div>
                    <Link to="/course" style={{ textDecoration: 'none' }}>
                      <button className="brow">Browse Courses</button>
                    </Link>
                  </div>
                </div>
                <div className="col-12 col-lg-8"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reasons;
