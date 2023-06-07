import React, { useState } from 'react';
import One from './One';
import Two from './Two';
import Three from './Three';
import ScrollToTop from '../../ScrollToTop';
const SwitchHolder = ({ step, setStep, category }) => {
  const [sections, setSections] = useState([]);

  const renderUploadsScreens = () => {
    switch (step) {
      case 1:
        return (
          <One
            step={step}
            setStep={setStep}
            category={category}
            sections={sections}
          />
        );
      case 2:
        return (
          <Two
            step={step}
            setStep={setStep}
            category={category}
            setSections={setSections}
            sections={sections}
          />
        );
      case 3:
        return <Three step={step} setStep={setStep} />;
      default:
        return null;
    }
  };
  return (
    <div>
      {renderUploadsScreens()}
      <ScrollToTop />
    </div>
  );
};

export default SwitchHolder;
