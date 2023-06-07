import React, { useContext } from 'react';
import { RiUploadCloudFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { CourseContext } from './CourseContext';
const Catergory = () => {
  const uploads = [
    { courseName: 'UI Design', category: 'UI Design' },
    { courseName: 'UX Design', category: 'UX Design' },
    { courseName: 'Wireframe', category: 'Wireframe' },
    { courseName: 'Typography', category: 'Typography' },
    { courseName: 'Prototyping', category: 'Prototyping' },
    { courseName: 'UX Writing', category: 'UX Writing' },
    { courseName: 'High Fidelity', category: 'High Fidelity' },
    { courseName: 'UX Research', category: 'UX Research' },
    { courseName: 'Colour Theory', category: 'Colour Theory' },
  ];
   const { setCourseName, setCategory } = useContext(CourseContext);

   const handleCourseClick = (course) => {
     setCourseName(course.courseName);
     setCategory(course.category);
   };
  return (
    <div className="mt-5">
      <div>
        <div className="d-flex justify-content-between">
          <div className="feature">🔥 Feature</div>
          <div className="feature">Add Category</div>
        </div>

        <div className="row mt-4">
          {uploads.map((upload, index) => (
            <div className="col-12 col-lg-4 mb-5" key={index}>
              <Link
                to="/chh"
                style={{ textDecoration: 'none' }}
                onClick={() => handleCourseClick(upload)}
              >
                <div className="favss">
                  <div className="uploada centerdd">Upload a</div>
                  <div className="cloudesx">
                    <RiUploadCloudFill />
                  </div>
                  <div className="uxDesign">{upload.courseName}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catergory;
