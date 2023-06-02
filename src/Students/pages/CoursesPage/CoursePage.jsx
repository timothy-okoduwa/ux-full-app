import React from 'react';
import './CoursePage.css';
import CourseHead from '../../components/CourseHead';
import UxResearch from '../../components/UxResearch';
import ComingSoon from '../../components/ComingSoon';
import Suggestions from '../../components/Suggestions';
import Listen from '../../components/Listen';
const CoursePage = () => {
  return (
    <div>
      <CourseHead />
      <UxResearch />
      <UxResearch />
      <UxResearch />
      <UxResearch />
      <ComingSoon/>
      <Suggestions/>
      <Listen/>
    </div>
  );
};

export default CoursePage;
