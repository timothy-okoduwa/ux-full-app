import React, { useState, useEffect } from 'react';
import CourseCard from '../../components/CourseCard';
import CourseDescriptionAndContent from '../../components/CourseDescriptionAndContent';
import CourseRequirement from '../../components/CourseRequirement';
import DesignToFit from '../../components/DesignToFit';
import RecommendedCourse from '../../components/RecomendedCourse';
import { useParams } from 'react-router-dom';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import AvailableCourses from '../../components/AvailableCourses';
const CoursePreview = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      const adminQuery = query(collection(db, 'Admin'));
      const adminSnapshot = await getDocs(adminQuery);

      if (!adminSnapshot.empty) {
        const allCourses = adminSnapshot.docs.reduce((accumulator, doc) => {
          const data = doc.data();
          const categoryCourses = data.Allcourses || {};

          // Iterate through each category in the Allcourses object
          Object.values(categoryCourses).forEach((coursesArray) => {
            // Find the course object whose courseId matches the one passed
            const matchingCourse = coursesArray.find(
              (course) => course.courseId === courseId
            );

            if (matchingCourse) {
              accumulator.push(matchingCourse); // Add the matching course to the accumulator
            }
          });

          return accumulator;
        }, []);

        if (allCourses.length > 0) {
          setCourse(allCourses[0]); // Set the first matching course as the current course
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
    <div className="cpcp">
      <CourseCard course={course} />

      <CourseDescriptionAndContent course={course} />
      <CourseRequirement course={course} />
      <DesignToFit />
      <AvailableCourses />
    </div>
  );
};

export default CoursePreview;
