import React, { useState, useEffect } from 'react';
import LeftWatch from '../../components/LeftWatch';
import RightWatch from '../../components/RightWatch';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../../firebase';
const StartWatching = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [selectedSubVideo, setSelectedSubVideo] = useState(null);
  const handleSubVideoSelect = (subVideo) => {
    setSelectedSubVideo(subVideo);
  };

  useEffect(() => {
    const fetchCourse = async () => {
      if (auth.currentUser) {
        const studentDocRef = doc(db, 'student', auth.currentUser.uid);
        const studentDoc = await getDoc(studentDocRef);

        if (studentDoc.exists()) {
          const studentData = studentDoc.data();
          const purchasedCourses = studentData.purchasedCourses || [];

          // Find the course object whose courseId matches the one passed
          const matchingCourse = purchasedCourses.find(
            (course) => course.courseId === courseId
          );

          if (matchingCourse) {
            setCourse(matchingCourse); // Set the matching course as the current course
          }
        }
      }
    };

    fetchCourse();
  }, [courseId]);

  if (!course) {
    return null; // Render null or loading state if course data is not available
  }

  console.log(course);
  return (
    <div className="shy">
      <div className="">
        <div className="rgnfd">
          <LeftWatch course={course} onSelectSubVideo={handleSubVideoSelect} />
          <RightWatch course={course} selectedSubVideo={selectedSubVideo} />
        </div>
      </div>
    </div>
  );
};

export default StartWatching;
