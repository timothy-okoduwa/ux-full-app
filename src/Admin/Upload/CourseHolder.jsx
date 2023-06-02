import React, { useContext } from 'react'
import HeadAndNav from '../HeadAndNav/HeadAndNav';
import MobileNav from '../HeadAndNav/MobileNav';
import CourseAll from './CourseAll';
import { CourseContext } from './CourseContext';
const CourseHolder = () => {
 const { courseName, category } = useContext(CourseContext);
console.log(courseName);
  return (
    <div>
      <HeadAndNav />
      <MobileNav />
      <CourseAll courseName={courseName} category={category} />
    </div>
  );
}

export default CourseHolder