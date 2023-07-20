import React from 'react';
import y from '../pages/Webinars/yng.png';
import UpcomingWebinar from './UpcomingWebinar';
import PastWebinarSlider from './PastWebinarSlider';
const PlayWebinarDetails = ({ course }) => {
  return (
    <div>
      <div className="hayze " style={{ marginTop: '120px' }}>
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-6 mb-5">
              <div>
                <div className="webDesc">Webinar Description</div>
                <div className="qurd">{course?.description}</div>
              </div>
            </div>

            <div className="col-12 col-lg-6 mb-5 mt-4">
              <div>
                <div className="webDesc mb-4">About Host</div>
                <div className="mb-4">
                  <div className="yemi">
                    <div className="cirue">
                      <img
                        src={course?.selectedTutorImage || y}
                        alt=""
                        className="cirue"
                      />
                    </div>
                    <div className="left">
                      <div className="sly">{course?.tutorName}</div>
                      <div className="pot">{course?.hostOccupation}</div>
                    </div>
                  </div>
                </div>
                <div className="qurd">{course?.aboutHost}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-5">
          <PastWebinarSlider />
        </div>
      </div>
    </div>
  );
};

export default PlayWebinarDetails;
