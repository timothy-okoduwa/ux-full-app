import React from 'react';
import CourseList from './CourseList';
import { useNavigate } from 'react-router-dom';
const RestHolder = () => {
  const navigate = useNavigate();
  const move = () => {
    navigate('/chh');
  };
  const movec = () => {
    navigate('/coming-soon');
  };
  const movew = () => {
    navigate('/seeall');
  };
  return (
    <div className="bgi">
      <div className="container">
        <div className="add_course_tab container">
          <div className="toba">
            <div className="corses_added"> Courses Added</div>
            <div className="create_new_course" onClick={move}>
              {' '}
              + Create new courses
            </div>
          </div>
          <div className="toba">
            <div className="create_new_course" onClick={movec}>
              {' '}
              + Create Coming Soon courses
            </div>
            <div className="corses_added">
              <div className="create_new_course" onClick={movew}>
                {' '}
                view all coming soon
              </div>
            </div>
          </div>
        </div>
        <CourseList />
      </div>
    </div>
  );
};

export default RestHolder;
