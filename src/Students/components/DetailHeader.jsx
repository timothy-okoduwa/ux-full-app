import React from 'react';
import { BsFillCircleFill, BsCalendar3, BsClock } from 'react-icons/bs';
const DetailHeader = ({ course }) => {
  return (
    <div className="container">
      <div
        className="firstName222 "
        style={{
          backgroundImage: `url(${course?.selectedWebinarBanner})`,
          borderRadius: '12px',
        }}
      >
        <div className="container">
          <div className="pt-5 smugh">
            <div className="what">{course?.courseName}</div>
            <div className="mt-5">
              <div className="livebig">
                {' '}
                <BsFillCircleFill className="circledd2" />{' '}
                <span className="liveWeb2">Live Webinar</span>
              </div>
            </div>
            <div className="hfugy">
              <div className="hfugy2">
                <BsCalendar3 className="calender" />
                <div className="dates">{course?.webinarDate}</div>
              </div>
              <div className="hfugy2">
                <BsClock className="calender" />
                <div className="dates"> {course?.WebinarTime}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailHeader;
