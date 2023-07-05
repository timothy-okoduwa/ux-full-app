import React from 'react';

const CourseRequirement = ({ course }) => {
  return (
    <div className="shaws">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-4 mb-5">
            <div>
              <div className="wywl">What you will learn</div>
            </div>
            <div>
              <div className="pt-3">
                {course.learn.map((missed) => (
                  <div>
                    <li className="reqq mb-3">{missed}</li>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-4 mb-5">
            <div>
              <div className="wywl">Requirements </div>
            </div>
            <div>
              <div className="pt-3">
                {course.requirement.map((missed) => (
                  <div>
                    <li className="reqq mb-3">{missed}</li>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-4 mb-5">
            <div>
              <div className="wywl">Instructor</div>
            </div>
            <div>
              <div className="pt-3">
                <div>
                  <li className="reqq mb-3">{course.tutorName}</li>
                </div>
              </div>
              <div className="pt-3">
                <li className="reqq">{course.tutorJob}</li>
              </div>
              <div className="pt-3">
                <li className="reqq mb-3">{course.tutorDescription}</li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseRequirement;
