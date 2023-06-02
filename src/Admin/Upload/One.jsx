import React from 'react'
import { RiUploadCloudFill } from 'react-icons/ri';
const One = ({
  step,
  setStep,
  courseName,
  setCourseName,
  courseDescription,
  setCourseDescription,
  price,
  setPrice,
  courseDuration,
  setCourseDuration,
}) => {
  const move = () => {
    setStep(step + 1);
  };
  return (
    <div>
      <div>
        <div className="row">
          <div className="col-12 col-lg-6">
            <div>
              <div className="cacus">Course Name</div>
              <div>
                <input
                  type="text"
                  className="feeelz"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div>
              <div className="cacus">Course Description</div>
              <div>
                <input
                  type="text"
                  className="feeelz"
                  value={courseDescription}
                  onChange={(e) => setCourseDescription(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div>
              <div className="cacus">Price</div>
              <div>
                <input
                  type="text"
                  className="feeelz"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div>
              <div className="cacus">Course Duration</div>
              <div>
                <input
                  type="text"
                  className="feeelz"
                  value={courseDuration}
                  onChange={(e) => setCourseDuration(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="col-12 mb-4">
            <div>
              <div className="cacus">Preview Video</div>
              <div>
                <div className="forImahe ">
                  <div className="broken-line">
                    <div className="cloudesx mt-5">
                      <RiUploadCloudFill />
                    </div>
                    <div className="click">
                      Click “Upload” to upload course preview video
                    </div>
                    <button className="upload-Button">Upload</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 mb-4">
            <div>
              <div className="cacus">Video Thumbnail </div>
              <div>
                <div className="forImahe ">
                  <div className="broken-line">
                    <div className="cloudesx mt-5">
                      <RiUploadCloudFill />
                    </div>
                    <div className="click">
                      Click “Upload” to upload video thumbnail
                    </div>
                    <button className="upload-Button">Upload</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <button className="next-button" onClick={move}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default One