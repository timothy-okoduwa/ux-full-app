import React from 'react'
import CourseList from './CourseList';
import { useNavigate } from 'react-router-dom';
const RestHolder = () => {
  const navigate=useNavigate()
  const move=()=>{
navigate('/chh');
  }
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
        </div>
        <CourseList />
      </div>
    </div>
  );
}

export default RestHolder