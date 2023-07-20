import React, { useState } from 'react';

const CourseRequirement = ({ course }) => {
  const [isMyOwnVisible, setIsMyOwnVisible] = useState(true);
  const [isInstructorVisible, setIsInstructorVisible] = useState(false);
  const [isRequirementVisible, setIsRequirementVisible] = useState(false);

  const toggleMyOwnVisibility = () => {
    setIsMyOwnVisible(!isMyOwnVisible);
    setIsInstructorVisible(false);
    setIsRequirementVisible(false);
  };

  const toggleInstructorVisibility = () => {
    setIsMyOwnVisible(false);
    setIsInstructorVisible(!isInstructorVisible);
    setIsRequirementVisible(false);
  };

  const toggleRequirementVisibility = () => {
    setIsMyOwnVisible(false);
    setIsInstructorVisible(false);
    setIsRequirementVisible(!isRequirementVisible);
  };
  return (
    <div className="shaws">
      <div className="container">
        {/* <div className="row">
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
        </div> */}
        <div className="about">About Course</div>

        <div className="yhyhyh compoiu">
          <div className="row">
            <div className="col-12 col-lg-4 mb-5">
              <div>
                <div className="whatsde">
                  <div
                    className={isMyOwnVisible ? 'flott' : 'flottee'}
                    onClick={toggleMyOwnVisibility}
                  >
                    What you will learn
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-4 mb-5">
              <div>
                <div className="whatsde">
                  <div
                    className={isRequirementVisible ? 'flott' : 'flottee'}
                    onClick={toggleRequirementVisibility}
                  >
                    Requirements{' '}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4 mb-5">
              <div>
                <div className="whatsde">
                  <div
                    className={isInstructorVisible ? 'flott' : 'flottee'}
                    onClick={toggleInstructorVisibility}
                  >
                    Instructor
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="row">
              <div className="col-12">
                <div className={`my-own ${isMyOwnVisible ? '' : 'hiderr'}`}>
                  <div>
                    {course.learn.map((ll) => (
                      <li className="wiuy">{ll}</li>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div
                  className={`my-own ${isRequirementVisible ? '' : 'hiderr'}`}
                >
                  <div>
                    {course.requirement.map((ll) => (
                      <li className="wiuy">{ll}</li>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div
                  className={`my-own ${isInstructorVisible ? '' : 'hiderr'}`}
                >
                  <div className="w-100">
                    <div>
                      <div className="whooo">
                        <div className="tutor_image">
                          <img
                            src={course.InstructorImage || course.thumbnailURL}
                            alt="instructor"
                            className="tutor_image"
                          />
                        </div>
                        <div className="mx-3">
                          <div className="extara">{course.tutorName} </div>
                          <div className="extara">{course.tutorJob} </div>
                        </div>
                      </div>
                      <div className="description">
                        {course.tutorDescription}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="yhyhyh vnvnvnf">
          <div className="row">
            <div className="col-12 col-lg-4 mb-5">
              <div>
                <div className="whatsde">
                  <div>What you will learn</div>
                </div>
                <div className="my-own mt-4">
                  <div>
                    {course.learn.map((ll) => (
                      <li className="wiuy">{ll}</li>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-4 mb-5">
              <div>
                <div className="whatsde">
                  <div>Requirements </div>
                </div>
                <div className="my-own mt-4">
                  <div>
                    {course.requirement.map((ll) => (
                      <li className="wiuy">{ll}</li>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4 mb-5">
              <div>
                <div className="whatsde">
                  <div>Instructor</div>
                </div>
                <div className="my-own mt-4">
                  <div>
                    {/* <ul>
                          <li className="wiuy">{course.tutorName} </li>
                          <li className="wiuy">{course.tutorDescription}</li>
                          <li className="wiuy">{course.tutorJob}</li>
                        </ul> */}
                    <div className="w-100">
                      <div>
                        <div className="whooo">
                          <div className="tutor_image">
                            <img
                              src={
                                course.InstructorImage || course.thumbnailURL
                              }
                              alt="instructor"
                              className="tutor_image"
                            />
                          </div>
                          <div className="mx-3">
                            <div className="extara">{course.tutorName} </div>
                            <div className="extara">{course.tutorJob} </div>
                          </div>
                        </div>
                        <div className="description">
                          {course.tutorDescription}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseRequirement;
