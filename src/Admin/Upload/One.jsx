import React, { useState } from 'react';
import { RiUploadCloudFill } from 'react-icons/ri';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db, auth } from '../../firebase';
const One = ({ step, setStep, category }) => {
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [price, setPrice] = useState('');
  const [courseDuration, setCourseDuration] = useState('');


  const move = async () => {
    try {
      const categoryRef = doc(db, 'Admin', auth.currentUser.uid);
const courseInfo = {
  nameOfCourse: courseName,
  Duration: courseDuration,
  price: price,
  courseDescription: courseDescription,
};
      // Update the category document in Firebase with the updated courseInfo object
      await updateDoc(categoryRef, {
        [category]: arrayUnion(courseInfo),
      });

      setStep(step + 1); // Move to the next step
    } catch (error) {
      // Handle any errors
      console.log(error);
    }
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

export default One;
