import React from 'react';
import './CoursePage.css';
import CourseOnly from '../../components/CourseOnly';
// import Linkers from '../../components/Linkers';
import AllCourses from '../../components/AllCourses';
const CourseCategories = () => {
  return (
    <div className="actss">
      <CourseOnly />
      {/* <Linkers/> */}
      <AllCourses />
    </div>
  );
};

export default CourseCategories;
