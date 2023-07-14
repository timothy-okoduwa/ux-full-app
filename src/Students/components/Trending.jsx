import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Trending = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    searchTrendingCourses();
  }, []);

  const searchTrendingCourses = async () => {
    const trendingCourseIds = [];

    // Retrieve the student collection
    const studentQuerySnapshot = await getDocs(collection(db, 'student'));

    // Create an object to track the count of each course ID
    const courseIdCountMap = {};

    // Iterate over each student document
    studentQuerySnapshot.forEach((studentDoc) => {
      const purchasedCourses = studentDoc.data()?.purchasedCourses || [];

      // Iterate over the purchasedCourses of the current student
      purchasedCourses.forEach((course) => {
        const courseId = course.courseId;
        courseIdCountMap[courseId] = (courseIdCountMap[courseId] || 0) + 1;
      });
    });

    // Check for course IDs that appear more than once across different students
    Object.entries(courseIdCountMap).forEach(([courseId, count]) => {
      if (count > 1) {
        trendingCourseIds.push(courseId);
      }
    });

    console.log('Trending Course IDs:', trendingCourseIds);
    // Retrieve the Admin collection
    const adminQuerySnapshot = await getDocs(collection(db, 'Admin'));
    const adminData = adminQuerySnapshot.docs[0]?.data();

    const trendingCourses = [];

    // Iterate over the Allcourses object
    Object.values(adminData?.Allcourses || {}).forEach((coursesArray) => {
      coursesArray.forEach((course) => {
        // Check if courseId matches any captured trending courseIds
        if (trendingCourseIds.includes(course.courseId)) {
          // This is a trending course
          trendingCourses.push(course);
        }
      });
    });

    // Set the courses state with the trending courses
    setCourses(trendingCourses);
  };

  return (
    <div className="woit">
      {courses.length === 0 ? (
        // Default page when no trending courses available
        <div className="container">
          <div className="trending">Trending Course</div>
          <div className="rtyu">
            <div className="owns">
              <div className="container">
                <div className="row">
                  <div className="col-12 col-lg-4">
                    <div className="forget">
                      <div className="dt">Design Thinking</div>
                      <div className="from">
                        From writing and design, to maximizing engagement with
                        carousels and Reels, Learn Chris Do's exact process for
                        make attention-grabbing Instagram content meant to grow
                        your industry authority.
                      </div>
                      <div className="d-flex justify-content-start align-items-center mt-5">
                        <div>
                          <Link to="/course">
                            <button className="enroll">ENROLL NOW</button>
                          </Link>
                        </div>
                        <div className="woeko">N 5,000</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-8">
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Render trending courses
        <>
          <div className="container">
            <div className="trending">Trending Course</div>
          </div>

          <Carousel showThumbs={false} autoPlay={true} infiniteLoop={true}>
            {courses.map((course) => (
              <div className="container" key={course.courseId}>
                <div className="rtyu">
                  <div
                    className="owns"
                    style={{
                      backgroundImage: `url(${course.thumbnailURL})`,
                      borderRadius: '8px',
                    }}
                  >
                    <div className="container">
                      <div className="row">
                        <div className="col-12 col-lg-6">
                          <div className="forget">
                            <div className="dt">{course.nameOfCourse}</div>
                            <div className="from">
                              {course.courseDescription.length > 300
                                ? `${course.courseDescription.slice(0, 300)}...`
                                : course.courseDescription}
                            </div>
                            <div className="d-flex justify-content-start align-items-center mt-5">
                              <div>
                                <Link to={`/course-preview/${course.courseId}`}>
                                  <button className="enroll">ENROLL NOW</button>
                                </Link>
                              </div>
                              <div className="woeko">
                                {' '}
                                ₦ {parseFloat(course.price).toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </>
      )}
    </div>
  );
};

export default Trending;
