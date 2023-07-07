import React, { useState, useEffect } from 'react';
import {
  getDoc,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
  collection,
} from 'firebase/firestore';
import { db, auth } from '../../firebase';
import CircularProgress from '@mui/material/CircularProgress';

const EOne = ({ step, setStep, courseId }) => {
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
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const docRef = doc(db, 'Admin', auth?.currentUser?.uid);
        const docSnap = await getDoc(docRef);
        // console.log('docSnap:', docSnap);
        const adminData = docSnap.data();
        // console.log('adminData:', adminData);
        const allCourses = adminData.Allcourses || {};
        // console.log('allcourses :', allCourses);
        let selectedCourse = null;

        // Iterate over each array in allCourses
        for (const courseArrayKey in allCourses) {
          const courseArray = allCourses[courseArrayKey];
          // Search for the object with matching courseId
          selectedCourse = courseArray.find(
            (course) => course.courseId === courseId
          );
          if (selectedCourse) {
            // Break the loop if the object is found
            break;
          }
        }

        setCourse(selectedCourse || {});
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourse();
  }, [db, auth, courseId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const docRef = doc(db, 'Admin', auth?.currentUser?.uid);
      const docSnap = await getDoc(docRef);
      const adminData = docSnap.data();
      const allCourses = { ...adminData.Allcourses }; // Clone the Allcourses object
      let updated = false;

      // Iterate over each array in allCourses
      for (const courseArrayKey in allCourses) {
        const courseArray = allCourses[courseArrayKey];
        // Search for the object with matching courseId
        const courseIndex = courseArray.findIndex(
          (course) => course.courseId === courseId
        );
        if (courseIndex !== -1) {
          // Update the specific course object
          courseArray[courseIndex] = { ...course };
          updated = true;
          break;
        }
      }

      if (!updated) {
        throw new Error(`Course with ID ${courseId} not found.`);
      }

      await updateDoc(docRef, { Allcourses: allCourses });
      // show success message
      // navigate('/dashboard');

      // Search the student collection for documents
      const studentCollectionRef = collection(db, 'student');
      const studentQuery = query(studentCollectionRef);
      const studentDocsSnap = await getDocs(studentQuery);

      // Iterate over the student documents and update purchasedCourses
      const updates = [];
      const courseUpdates = {
        nameOfCourse: course.nameOfCourse,
        price: course.price,
        Duration: course.Duration,
        previewVideo: course.previewVideo,
        category: course.category,
        courseDescription: course.courseDescription,
      };

      studentDocsSnap.forEach((studentDoc) => {
        const studentData = studentDoc.data();
        const purchasedCourses = studentData.purchasedCourses;

        // Update the purchasedCourses array if the courseId matches
        const updatedPurchasedCourses = purchasedCourses.map((courseP) => {
          if (courseP.courseId === courseId) {
            // Update the courseP information
            console.log(courseP);
            return { ...courseP, ...courseUpdates };
          }
          return courseP;
        });

        updates.push(
          updateDoc(studentDoc.ref, {
            purchasedCourses: updatedPurchasedCourses,
          })
        );
      });

      // Update the student documents with the updated purchasedCourses
      await Promise.all(updates);
    } catch (error) {
      console.error(error);
      // show error message
    } finally {
      setLoading(false);
    }
    setStep(step + 1);
  };

  if (!course) {
    return null;
  }
  // console.log('course:', course);

  return (
    <div>
      <div>
        <div className="design mb-4">
          {course.nameOfCourse} (
          <span style={{ fontSize: '16px' }}>{course.category}</span>)
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-lg-6">
          <div>
            <div className="cacus">Course Name</div>
            <div>
              <input
                type="text"
                className="feeelz"
                name="nameOfCourse"
                value={course.nameOfCourse}
                onChange={handleChange}
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
                name="price"
                value={course.price}
                onChange={handleChange}
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
                name="Duration"
                value={course.Duration}
                onChange={handleChange}
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
                name="previewVideo"
                value={course.previewVideo}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-6 mb-4">
          <div>
            <div className="cacus">Category</div>
            <div>
              <select
                className="feeelz"
                name="category"
                value={course.category}
                onChange={handleChange}
              >
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
                name="courseDescription"
                value={course.courseDescription}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <button className="next-button" onClick={handleSubmit}>
            {loading ? (
              <CircularProgress
                style={{ height: '30px', width: '30px', color: 'white' }}
              />
            ) : (
              'Next'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EOne;
