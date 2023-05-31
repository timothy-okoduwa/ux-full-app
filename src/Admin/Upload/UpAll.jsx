import React from 'react'
import FeatureUpload from './FeatureUpload';
import Catergory from './Catergory';
const UpAll = () => {
  return (
    <div className="bgi ">
      <div className="container">
        <div className="rec">Upload Content</div>

        <div>
          <FeatureUpload/>
        </div>
        <div>
          <Catergory/>
        </div>
      </div>
    </div>
  );
}

export default UpAll