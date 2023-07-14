import React, { useState } from 'react';
import { doc, collection, addDoc, Timestamp } from 'firebase/firestore';
import { RiUploadCloudFill } from 'react-icons/ri';
import { TiTimes } from 'react-icons/ti';
import { db, auth, storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const CMInput = () => {
  const [courseName, setCourseName] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [tutorName, setTutorName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const move = async () => {
    try {
      const adminRef = doc(db, 'Admin', auth.currentUser.uid);
      let comingImage = '';
      if (selectedImage) {
        const storageRef = ref(
          storage,
          `comingSoon/${auth.currentUser.uid}/${Date.now()}`
        );
        const uploadSnapshot = await uploadBytes(storageRef, selectedImage);
        const downloadURL = await getDownloadURL(uploadSnapshot.ref);
        comingImage = downloadURL;
      }

      const postObject = {
        courseName,
        price,
        duration,
        description,
        tutorName,
        upComingId: uuidv4(),
        selectedImage: comingImage,
        createdAt: Timestamp.fromDate(new Date()),
      };

      await addDoc(adminRef, {
        comingSoon: [postObject],
      });

      // Clear the form
      setCourseName('');
      setPrice('');
      setDuration('');
      setDescription('');
      setTutorName('');
      setSelectedImage(null);
    } catch (error) {
      console.log('Error uploading the post:', error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  return (
    <div className="bgi">
      <div className="container">
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
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 mb-4">
            <div>
              <div className="cacus">Tutor Name</div>
              <div>
                <input
                  type="text"
                  className="feeelz"
                  value={tutorName}
                  onChange={(e) => setTutorName(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="col-12 mb-4">
            <div>
              <div className="cacus">Course Description</div>
              <div>
                <textarea
                  type="text"
                  className="feeelz2"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="col-12 mb-4">
            <div>
              <div className="cacus">Course Thumbnail </div>
              <div>
                <div className="forImahe ">
                  <div className="broken-line">
                    {selectedImage ? (
                      <div className="uploaded-image-container">
                        <div
                          className="close-button"
                          onClick={() => setSelectedImage(null)}
                        >
                          <TiTimes />
                        </div>
                        <img
                          src={URL.createObjectURL(selectedImage)}
                          alt="Thumbnail"
                          className="uploaded-image"
                        />
                      </div>
                    ) : (
                      <div className="flips">
                        {' '}
                        <div className="cloudesx mt-5">
                          <RiUploadCloudFill />
                        </div>
                        <div className="click">
                          Click “Upload” to upload course thumbnail
                        </div>
                        <label
                          className="upload-Button"
                          htmlFor="thumbNailUpload"
                        >
                          Upload
                        </label>
                        <input
                          type="file"
                          id="thumbNailUpload"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={handleImageUpload}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <button className="next-button" onClick={move}>
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CMInput;
