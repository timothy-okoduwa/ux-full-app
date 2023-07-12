import React, { useState } from 'react';

import LeftSettings from './LeftSettings';

import MultiSetting from '../pages/Settings/MultiSetting';

const PersonalInfo = () => {
  const [step, setStep] = useState(1);
  const [previousStep, setPreviousStep] = useState(0);

  const handleStepChange = (newStep) => {
    setPreviousStep(step);
    setStep(newStep);
  };

  const navigateToStep = (newStep) => {
    if (newStep !== step) {
      handleStepChange(newStep);
    }
  };
  return (
    <div>
      <div className="Settings">Settings</div>

      <div className="row mt-5">
        <div className="col-12 col-lg-3">
          <div>
            <LeftSettings
              step={step}
              setStep={setStep}
              previousStep={previousStep}
              setPreviousStep={setPreviousStep}
              navigateToStep={navigateToStep}
            />
          </div>
        </div>
        <div className="col-12 col-lg-9">
          <MultiSetting step={step} setStep={setStep} />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
