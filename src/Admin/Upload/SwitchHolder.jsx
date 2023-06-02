import React, { useState } from 'react';
import One from './One';
import Two from './Two';
import Three from './Three';
import ScrollToTop from '../../ScrollToTop';

const SwitchHolder = ({ step, setStep }) => {
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [price, setPrice] = useState('');
  const [courseDuration, setCourseDuration] = useState('');
  const renderUploadsScreens = () => {
    switch (step) {
      case 1:
        return (
          <One
            step={step}
            setStep={setStep}
            courseName={courseName}
            setCourseName={setCourseName}
            courseDescription={courseDescription}
            setCourseDescription={setCourseDescription}
            price={price}
            setPrice={setPrice}
            courseDuration={courseDuration}
            setCourseDuration={setCourseDuration}
          />
        );
      case 2:
        return <Two step={step} setStep={setStep} />;
      case 3:
        return <Three step={step} setStep={setStep} />;
      default:
        return null;
    }
  };
  return <div>{renderUploadsScreens()}
  <ScrollToTop/>
  </div>;
};

export default SwitchHolder;
