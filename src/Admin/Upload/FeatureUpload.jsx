import React from 'react';
import { RiUploadCloudFill } from 'react-icons/ri';
const FeatureUpload = () => {
  return (
    <div>
      <div className="feature">🔥 Feature</div>

      <div className="row mt-4">
        <div className="col-12 col-lg-4 mb-4">
          <div className="favss">
            <div className="spanit">
              <div className="uploada">Upload a</div>
              <div>
                <RiUploadCloudFill className="cloudss" />
              </div>
            </div>
            <div className="Trending">Trending Course</div>
          </div>
        </div>
        <div className="col-12 col-lg-4 mb-4">
          <div className="favss">
            <div className="spanit">
              <div className="uploada">Upload a</div>
              <div>
                <RiUploadCloudFill className="cloudss" />
              </div>
            </div>
            <div className="Trending">Trending Course</div>
          </div>
        </div>
        <div className="col-12 col-lg-4"></div>
      </div>
    </div>
  );
};

export default FeatureUpload;
