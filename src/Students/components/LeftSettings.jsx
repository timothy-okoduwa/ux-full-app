import React from 'react';
import { BsPlayFill } from 'react-icons/bs';
const LeftSettings = ({
  step,
  setStep,
  previousStep,
  setPreviousStep,
  navigateToStep,
}) => {
  return (
    <div>
      <div className="mb-4">
        <div
          className={`light-up ${step === 1 ? 'whiteemm' : ''}`}
          onClick={() => navigateToStep(1)}
        >
          {step === 1 && <BsPlayFill className="hands" />}
          Personal Information
        </div>
      </div>
      <div className="mb-4">
        <div
          className={`light-up ${step === 2 ? 'whiteemm' : ''} ${
            previousStep >= 2 ? 'dark-again' : ''
          }`}
          onClick={() => navigateToStep(2)}
        >
          {step === 2 && <BsPlayFill className="hands" />}
          Purchase History
        </div>
      </div>
    </div>
  );
};

export default LeftSettings;
