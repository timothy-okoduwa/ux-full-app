import React, { useState } from 'react';
import { IoMdArrowDropright } from 'react-icons/io';
import EditSwitch from './EditSwitch';
import { useParams } from 'react-router-dom';
const EdHolder = () => {
  const { courseId } = useParams();
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
    <div className="bgi">
      <div className="container">
        <div className="rec">Edit Course</div>
        <div className="mt-4">
          <div className="row">
            <div className="col-12 col-md-4">
              <div
                className={`light-up ${step === 1 ? 'whiteemm' : ''}`}
                onClick={() => navigateToStep(1)}
              >
                {step === 1 && <IoMdArrowDropright />}
                Course Information
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div
                className={`light-up ${step === 2 ? 'whiteemm' : ''} ${
                  previousStep >= 2 ? 'dark-again' : ''
                }`}
                onClick={() => navigateToStep(2)}
              >
                {step === 2 && <IoMdArrowDropright />}
                Upload
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div
                className={`light-up ${step === 3 ? 'whiteemm' : ''} ${
                  previousStep >= 3 ? 'dark-again' : ''
                }`}
                onClick={() => navigateToStep(3)}
              >
                {step === 3 && <IoMdArrowDropright />}
                Course Details
              </div>
            </div>
          </div>
        </div>

        <div>
          <EditSwitch step={step} setStep={setStep} courseId={courseId} />
        </div>
      </div>
    </div>
  );
};

export default EdHolder;
