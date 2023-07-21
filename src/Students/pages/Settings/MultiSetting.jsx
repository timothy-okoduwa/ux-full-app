import React from 'react';
import PersOne from '../../components/PersOne';
import PersTwo from '../../components/PersTwo';
// import PersThree from '../../components/PersThree';

const MultiSetting = ({ step, setStep }) => {
  const renderEditScreans = () => {
    switch (step) {
      case 1:
        return <PersOne />;
      case 2:
        return <PersTwo />;
      default:
        return null;
    }
  };
  return <div>{renderEditScreans()}</div>;
};

export default MultiSetting;
