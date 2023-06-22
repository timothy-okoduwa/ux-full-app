import React, { useContext } from 'react'
import HeadAndNav from '../HeadAndNav/HeadAndNav';
import MobileNav from '../HeadAndNav/MobileNav';
import CourseAll from './CourseAll';
import { CourseContext } from './CourseContext';
const CourseHolder = () => {
 const { courseName1, category } = useContext(CourseContext);
console.log(courseName1);
  return (
    <div>
      <HeadAndNav />
      <MobileNav />
      <CourseAll courseName1={courseName1} category={category} />
    </div>
  );
}

export default CourseHolder