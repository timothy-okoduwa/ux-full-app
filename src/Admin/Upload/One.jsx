import React, { useState, useContext } from 'react';
import { RiUploadCloudFill } from 'react-icons/ri';
import { TiTimes } from 'react-icons/ti';
import { doc, updateDoc, getDoc, Timestamp } from 'firebase/firestore';
import { CourseContext } from './CourseContext';
import { db, auth, storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
export let courseInfo = [];
export let courseId = uuidv4();
const One = ({ step, setStep, category }) => {
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [price, setPrice] = useState('');
  const [courseDuration, setCourseDuration] = useState('');
  const [previewVideoLink, setPreviewVideoLink] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
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
  ];

  const { setCourseName1, setCategory } = useContext(CourseContext);
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCourseName1(courseName);
    setCategory(selectedCategory);
  };

  const move = async () => {
    try {
      const categoryRef = doc(db, 'Admin', auth.currentUser.uid);

      // Upload the image to Firebase Storage if a selected image exists
      let thumbnailURL = '';
      if (selectedImage) {
        const storageRef = ref(
          storage,
          `thumbnails/${auth.currentUser.uid}/${Date.now()}`
        );
        const uploadSnapshot = await uploadBytes(storageRef, selectedImage);
        const downloadURL = await getDownloadURL(uploadSnapshot.ref);
        thumbnailURL = downloadURL;
      }

      const newCourseInfo = {
        courseId: courseId,
        nameOfCourse: courseName,
        Duration: courseDuration,
        price: price,
        courseDescription: courseDescription,
        previewVideo: previewVideoLink,
        thumbnailURL: thumbnailURL,
        category: category,
        dateAdded: Timestamp.fromDate(new Date()),
      };

      // Retrieve the existing category data from Firestore
      const categoryDoc = await getDoc(categoryRef);
      if (categoryDoc.exists()) {
        const categoryData = categoryDoc.data();
        const existingCourses = categoryData.Allcourses?.[category] || [];
        const updatedCourses = [...existingCourses, newCourseInfo];

        // Update the category document in Firestore with the updated courses array
        await updateDoc(categoryRef, {
          Allcourses: {
            ...categoryData.Allcourses,
            [category]: updatedCourses,
          },
        });
      } else {
        console.log('Category not found.');
      }

      courseInfo.push(newCourseInfo); // Add the new courseInfo object to the array
      setStep(step + 1); // Move to the next step
    } catch (error) {
      // Handle any errors
      console.log(error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
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
          <div className="col-12 col-lg-6 mb-4">
            <div>
              <div className="cacus">Preview Video</div>
              <div>
                <input
                  type="text"
                  className="feeelz"
                  value={previewVideoLink}
                  onChange={(e) => setPreviewVideoLink(e.target.value)}
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
                  value={courseDescription}
                  onChange={(e) => setCourseDescription(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="col-12 mb-4">
            <div>
              <div className="cacus">Video Thumbnail </div>
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
                          Click “Upload” to upload video thumbnail
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
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default One;
