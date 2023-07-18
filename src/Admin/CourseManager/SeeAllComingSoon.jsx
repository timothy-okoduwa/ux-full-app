import React from 'react';
import HeadAndNav from '../HeadAndNav/HeadAndNav';
import MobileNav from '../HeadAndNav/MobileNav';
import './CourseManager.css';
import ManageCMS from './ManageCMS';
const SeeAllComingSoon = () => {
  return (
    <div>
      {' '}
      <HeadAndNav />
      <MobileNav />
      <ManageCMS />
    </div>
  );
};

export default SeeAllComingSoon;
