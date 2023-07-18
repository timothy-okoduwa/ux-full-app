import React, { useState } from 'react';
import { doc, getDoc, Timestamp, updateDoc, setDoc } from 'firebase/firestore';
import { RiUploadCloudFill } from 'react-icons/ri';
import { TiTimes } from 'react-icons/ti';
import { db, auth, storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
const CMInput = () => {
  const [courseName, setCourseName] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [tutorName, setTutorName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('');
  const uploads = [
    { courseName: 'choose a category', category: 'choose a category' },
    { courseName: 'UI Design', category: 'UI Design' },
    { courseName: 'UX Design', category: 'UX Design' },
    { courseName: 'Wireframe', category: 'Wireframe' },
    { courseName: 'Typography', category: 'Typography' },
    { courseName: 'Prototyping', category: 'Prototyping' },
    { courseName: 'UX Writing', category: 'UX Writing' },
    { courseName: 'High Fidelity', category: 'High Fidelity' },
    { courseName: 'UX Research', category: 'UX Research' },
    { courseName: 'Colour Theory', category: 'Colour Theory' },
    { courseName: 'Graphics Design', category: 'Graphics Design' },
  ];

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;

    setCategory(selectedCategory);
  };
  const navigate = useNavigate();
  const disabled =
    !courseName ||
    !price ||
    !duration ||
    !description ||
    !tutorName ||
    loading ||
    !category ||
    !selectedImage;
  const allId = uuidv4();
  const move = async () => {
    setLoading(true);
    try {
      const adminRef = doc(db, 'Admin', auth.currentUser.uid);
      const adminSnapshot = await getDoc(adminRef);
      let comingImage = '';
      if (selectedImage) {
        const storageRef = ref(
          storage,
          `comingSoon/${auth.currentUser.uid}/${allId}`
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
        category,
        upComingId: allId,
        selectedImage: comingImage,
        createdAt: Timestamp.fromDate(new Date()),
      };

      if (adminSnapshot.exists()) {
        // Update the existing document
        const currentComingSoon = adminSnapshot.data().comingSoon || [];
        await updateDoc(adminRef, {
          comingSoon: [...currentComingSoon, postObject],
        });
      } else {
        // Create a new document
        await setDoc(adminRef, {
          comingSoon: [postObject],
        });
      }

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
    navigate('/seeall');
    setLoading(false);
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
          <div className="col-12 col-lg-6 mb-4">
            <div>
              <div className="cacus">Category</div>
              <div>
                <select className="feeelz" onChange={handleCategoryChange}>
                  {uploads.map((upload, index) => (
                    <option key={index} value={upload.category}>
                      {upload.courseName}
                    </option>
                  ))}
                </select>
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
            <button className="next-button" onClick={move} disabled={disabled}>
              {loading ? (
                <CircularProgress
                  style={{ color: 'white', height: '30px', width: '30px' }}
                />
              ) : (
                'Upload'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CMInput;
