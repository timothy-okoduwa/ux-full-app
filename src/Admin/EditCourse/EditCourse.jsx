import React from 'react'
import './EditCourse.css';
import HeadAndNav from '../HeadAndNav/HeadAndNav';
import MobileNav from '../HeadAndNav/MobileNav';
import EdHolder from './EdHolder';
const EditCourse = () => {
  return (
    <div>
      <HeadAndNav />
      <MobileNav />
      <EdHolder/>
    </div>
  );
}

export default EditCourse