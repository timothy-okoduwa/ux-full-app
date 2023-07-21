import React from 'react';
import { useNavigate } from 'react-router-dom';
const PostingWeb = () => {
  const navigate = useNavigate();
  const nav = () => {
    navigate('/upcomingwebinar');
  };
  const nav2 = () => {
    navigate('/uploadpast');
  };
  const nav3 = () => {
    navigate('/rsvpwaitlist');
  };
  return (
    <div className="bgi">
      <div className="container">
        <div className="add_course_tab container">
          <div className="toba">
            <div className="corses_added"> Add Webinar</div>
            <div className="create_new_course" onClick={nav}>
              {' '}
              + Create upcoming webinar
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className="toba">
              <div className="create_new_course" onClick={nav2}>
                {' '}
                + Create Past Webinars
              </div>
            </div>
            <div className="toba">
              <div className="create_new_course" onClick={nav3}>
                {' '}
                RSVP WaitList
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostingWeb;
