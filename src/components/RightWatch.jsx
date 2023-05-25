import React, { useState } from 'react';
import a from '../pages/images/pexels.mp4';
// import CourseRequirement from './CourseRequirement';
const RightWatch = () => {
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
    <div>
      <div className="container mt-4">
        <div className="desde">Design Thinking</div>
        <div className="vincentur">Vincent Babs</div>
        <div>
          <div className="for-vidd">
            <video src={a} controls className="for-vidd" />
          </div>
        </div>
        <div className="loinuhy">
          <div className="container">
            <div className="cdcd">Course Description</div>
            <div className="njuyh">
              Why do we use it? It is a long established fact that a reader will
              be distracted by the text content of a site while looking at its
              design. The point of using Lorem Ipsum is that it has a more or
              less normal distribution of the letters, as opposed to using texts
              such as "Content here, content here". These texts make it sound
              like readable Spanish. Many desktop publishing packages and web
              page editors use Lorem Ipsum as their default text, and when doing
              a.
            </div>

            <div className="about">About Course</div>

            <div className="yhyhyh">
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
                    <div className={`my-own ${isMyOwnVisible ? '' : 'hiderr'}`}>
                      <div>
                        <ul>
                          <li className="wiuy">Web and mobile design </li>
                          <li className="wiuy">
                            Responsive design for various screen sizes{' '}
                          </li>
                          <li className="wiuy">Prototyping </li>
                          <li className="wiuy">Layout and grid guides</li>
                        </ul>
                      </div>
                    </div>
                    <div
                      className={`my-own ${
                        isInstructorVisible ? '' : 'hiderr'
                      }`}
                    >
                      <div>
                        <ul>
                          <li className="wiuy">
                            instructor and mobile design{' '}
                          </li>
                          <li className="wiuy">
                            Responsive design for various screen sizes{' '}
                          </li>
                          <li className="wiuy">Prototyping </li>
                          <li className="wiuy">Layout and grid guides</li>
                        </ul>
                      </div>
                    </div>
                    <div
                      className={`my-own ${
                        isRequirementVisible ? '' : 'hiderr'
                      }`}
                    >
                      <div>
                        <ul>
                          <li className="wiuy">Requirement and mobile design </li>
                          <li className="wiuy">
                            Responsive design for various screen sizes{' '}
                          </li>
                          <li className="wiuy">Prototyping </li>
                          <li className="wiuy">Layout and grid guides</li>
                        </ul>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightWatch;
