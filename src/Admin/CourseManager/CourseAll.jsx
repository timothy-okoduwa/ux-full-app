import React from 'react'
import HeadAndNav from '../HeadAndNav/HeadAndNav';
import MobileNav from '../HeadAndNav/MobileNav';
import './CourseManager.css';
import RestHolder from './RestHolder';
const CourseAll = () => {
  return (
    <div>
      <HeadAndNav />
      <MobileNav />
      <RestHolder/>
    </div>
  );
}

export default CourseAll