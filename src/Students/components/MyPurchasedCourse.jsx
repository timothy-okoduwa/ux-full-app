import React from 'react';
import { Link } from 'react-router-dom';

const MyPurchasedCourse = ({ user, searchQuery, filteredCourses }) => {
  const courses = searchQuery ? filteredCourses : user?.purchasedCourses;
  return (
    <div>
      <div className="container">
        <div className="go-back">
          <div className="my-course">My Course</div>
        </div>
        <div>
          <div className="row mt-5">
            {courses?.map((course) => (
              <div className="col-12 col-lg-3 mb-5">
                <div className="wsisisi2">
                  <div
                    className="linearr2"
                    style={{
                      backgroundImage: `url(${course.thumbnailURL})`,
                    }}
                  >
                    <div className="change22">
                      <div className="anita">{course.tutorName}</div>
                      <div className="ux">{course.nameOfCourse}</div>
                      <div className="hour">{course.Duration}</div>
                    </div>
                  </div>
                  <Link
                    to={`/start-watching/${course.courseId}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <div className="heart_flow">Continue Learning</div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPurchasedCourse;
