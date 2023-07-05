import React, { useState, useEffect } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';

const UxResearch = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      // Query the Admin collection to retrieve all documents
      const adminQuery = query(collection(db, 'Admin'));
      const adminSnapshot = await getDocs(adminQuery);

      if (!adminSnapshot.empty) {
        const allCourses = adminSnapshot.docs.reduce((accumulator, doc) => {
          const data = doc.data();
          const categoryCourses = data.Allcourses
            ? Object.entries(data.Allcourses)
            : [];
          return [...accumulator, ...categoryCourses];
        }, []);

        // Set the courses state with the retrieved array
        setCourses(allCourses);
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
      <div className="res">
        <div className="container">
          {courses.map(([categoryName, categoryCourses]) => (
            <div key={categoryName}>
              <div className="uxx">{categoryName}</div>
              <div className="row mt-5">
                {categoryCourses?.map((course) => (
                  <div className="col-12 col-lg-3 mb-5" key={course.id}>
                    <div className="wsisisi">
                      <Link
                        to={`/course-preview/${course.courseId}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <div
                          className="linearr"
                          style={{
                            backgroundImage: `url(${course.thumbnailURL})`,
                          }}
                        >
                          <div className="change">
                            <div className="anita">{course.tutorName}</div>
                            <div className="ux">{course.nameOfCourse}</div>
                            <div className="hour">{course.Duration}</div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-center mt-4 mb-4">
                <Link
                  to={{
                    pathname: '/course-category',
                    search: `?category=${categoryName}`,
                  }}
                >
                  <button className="view">VIEW MORE</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UxResearch;
