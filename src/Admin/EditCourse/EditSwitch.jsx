import React from 'react';
import EOne from './EOne.jsx';
import ETwo from './ETwo.jsx';
import ETree from './ETree.jsx';
// import { useParams } from 'react-router-dom';

const EditSwitch = ({ step, setStep, courseId }) => {
  //  const [sections, setSections] = useState([]);
  // const { courseId } = useParams();
  const renderEditScreans = () => {
    switch (step) {
      case 1:
        return <EOne step={step} setStep={setStep} courseId={courseId} />;
      case 2:
        return <ETwo step={step} setStep={setStep} courseId={courseId} />;
      case 3:
        return <ETree step={step} setStep={setStep} courseId={courseId} />;

      default:
        return null;
    }
  };
  return <div className="mt-4">{renderEditScreans()}</div>;
};

export default EditSwitch;
