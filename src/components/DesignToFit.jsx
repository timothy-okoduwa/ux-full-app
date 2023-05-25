import React from 'react'
import t from '../pages/images/time.png';
import l from '../pages/images/learn.png';
import m from '../pages/images/mentor.png';
const DesignToFit = () => {
  return (
    <div>
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
        </div>
        </div>
    </div>
  )
}

export default DesignToFit