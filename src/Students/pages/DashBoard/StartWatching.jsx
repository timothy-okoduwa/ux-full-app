import React, { useState, useEffect } from 'react';
import LeftWatch from '../../components/LeftWatch';
import RightWatch from '../../components/RightWatch';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../../../firebase';

const StartWatching = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [selectedSubVideo, setSelectedSubVideo] = useState(null);
  const [purchasedCourses, setPurchasedCourses] = useState([]); // New state for purchasedCourses

  const handlePurchasedCoursesUpdate = (updatedPurchasedCourses) => {
    setPurchasedCourses(updatedPurchasedCourses);
  };

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
            setPurchasedCourses(purchasedCourses); // Set the purchasedCourses state

            const firstSegment = matchingCourse.sections[0]?.segment[0];
            if (firstSegment) {
              setSelectedSubVideo(firstSegment.subVideo);
            }
          }
        }
      }
    };

    fetchCourse();
  }, [courseId]);
  if (!course) {
    return null; // Render null or loading state if course data is not available
  }
  const updateIsWatched = async () => {
    const matchingCourse = purchasedCourses.find(
      (course) => course.courseId === courseId
    );

    if (matchingCourse) {
      const updatedSections = matchingCourse.sections.map((section) => {
        const updatedSegment = section.segment.map((segment) => {
          if (segment.subVideo === selectedSubVideo) {
            return {
              ...segment,
              isWatched: true,
            };
          }
          return segment;
        });
        return {
          ...section,
          segment: updatedSegment,
        };
      });

      const updatedCourse = {
        ...matchingCourse,
        sections: updatedSections,
      };

      // Update the purchasedCourses array with the updated course
      const updatedPurchasedCourses = purchasedCourses.map((course) =>
        course.courseId === courseId ? updatedCourse : course
      );

      // Update the purchasedCourses state
      setPurchasedCourses(updatedPurchasedCourses);

      const studentDocRef = doc(db, 'student', auth.currentUser.uid);
      await updateDoc(studentDocRef, {
        purchasedCourses: updatedPurchasedCourses,
      });

      // Update the course state
      setCourse(updatedCourse);
    }
  };

  return (
    <div className="shy">
      <div className="">
        <div className="rgnfd">
          <LeftWatch
            course={course}
            courseId={courseId}
            setCourse={setCourse}
            setPurchasedCourses={setPurchasedCourses}
            purchasedCourses={purchasedCourses} // Pass the purchasedCourses state
            handlePurchasedCoursesUpdate={handlePurchasedCoursesUpdate} // Pass the callback function
            onSelectSubVideo={handleSubVideoSelect}
            updateIsWatched={updateIsWatched}
          />
          <RightWatch
            course={course}
            selectedSubVideo={selectedSubVideo}
            updateIsWatched={updateIsWatched}
          />
        </div>
      </div>
    </div>
  );
};

export default StartWatching;
