import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import PlayWebinarUrl from './PlayWebinarUrl';
import PlayWebinarDetails from './PlayWebinarDetails';
const PastWebinarDetails = () => {
  const { upComingId } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      const adminQuery = query(collection(db, 'Admin'));
      const adminSnapshot = await getDocs(adminQuery);

      if (!adminSnapshot.empty) {
        const allCourses = adminSnapshot.docs.reduce((accumulator, doc) => {
          const data = doc.data();
          const pastWebinar = data.pastWebinar || [];

          const matchingCourse = pastWebinar.find(
            (course) => course.upComingId === upComingId
          );

          if (matchingCourse) {
            accumulator.push(matchingCourse);
          }

          return accumulator;
        }, []);

        setCourse(allCourses[0]); // Assuming there is only one matching course
      }
    };

    fetchCourse();
  }, [upComingId]);
  console.log(course);
  return (
    <div>
      <PlayWebinarUrl course={course} />
      <PlayWebinarDetails course={course} />
    </div>
  );
};

export default PastWebinarDetails;
