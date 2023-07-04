import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import o from './images/opps.png';
const AllCourses = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialCategoryName = searchParams.get('category');
  const [categoryName, setCategoryName] = useState(initialCategoryName);
  const [courses, setCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategoryName);
  useEffect(() => {
    const fetchCourses = async () => {
      const adminQuery = query(collection(db, 'Admin'));
      const adminSnapshot = await getDocs(adminQuery);

      if (!adminSnapshot.empty) {
        const allCourses = adminSnapshot.docs.reduce((accumulator, doc) => {
          const data = doc.data();
          const categoryCourses = data.Allcourses || {};

          // Check if categoryName matches any of the category arrays
          const matchingCategory = Object.entries(categoryCourses).find(
            ([category]) => category === categoryName
          );

          if (matchingCategory) {
            const [, courses] = matchingCategory; // Extract the courses array
            return [...accumulator, ...courses];
          }

          return accumulator;
        }, []);

        setCourses(allCourses);
      }
    };

    fetchCourses();
  }, [categoryName, courses]);

  const handleCategoryClick = (clickedCategory) => {
    setCategoryName(clickedCategory);
    setSelectedCategory(clickedCategory);
  };

  console.log('Courses:', courses);
  return (
    <>
      <div className="linkee">
        <div className="container">
          <div>
            <div className="desny">{categoryName}</div>
          </div>
          <div className="x-bill">
            <div
              className={`textp ${
                selectedCategory === 'UI Design' ? 'selected' : ''
              }`}
              onClick={() => handleCategoryClick('UI Design')}
            >
              UI Design
            </div>
            <div
              className={`textp ${
                selectedCategory === 'UX Design' ? 'selected' : ''
              }`}
              onClick={() => handleCategoryClick('UX Design')}
            >
              UX Design
            </div>
            <div
              className={`textp ${
                selectedCategory === 'Wireframe' ? 'selected' : ''
              }`}
              onClick={() => handleCategoryClick('Wireframe')}
            >
              Wireframe
            </div>
            <div
              className={`textp ${
                selectedCategory === 'Typography' ? 'selected' : ''
              }`}
              onClick={() => handleCategoryClick('Typography')}
            >
              Typography
            </div>
            <div
              className={`textp ${
                selectedCategory === 'Prototyping' ? 'selected' : ''
              }`}
              onClick={() => handleCategoryClick('Prototyping')}
            >
              Prototyping
            </div>
            <div
              className={`textp ${
                selectedCategory === 'UX Writing' ? 'selected' : ''
              }`}
              onClick={() => handleCategoryClick('UX Writing')}
            >
              UX Writing
            </div>
            <div
              className={`textp ${
                selectedCategory === 'High Fidelity' ? 'selected' : ''
              }`}
              onClick={() => handleCategoryClick('High Fidelity')}
            >
              High Fidelity
            </div>
            <div
              className={`textp ${
                selectedCategory === 'UX Research' ? 'selected' : ''
              }`}
              onClick={() => handleCategoryClick('UX Research')}
            >
              UX Research
            </div>
            <div
              className={`textp ${
                selectedCategory === 'Colour Theory' ? 'selected' : ''
              }`}
              onClick={() => handleCategoryClick('Colour Theory')}
            >
              Colour Theory
            </div>
          </div>
        </div>
      </div>
      <div className="allmfc">
        <div className="container">
          <div className="row">
            {courses.length === 0 ? (
              <div className="col-12">
                <div className="oops-message">
                  <div className="bvhvbh">
                    <img src={o} alt="" style={{ width: '100%' }} />
                  </div>
                  <div className="mt-3"> Oops, nothing to show.</div>
                </div>
              </div>
            ) : (
              courses.map((course) => (
                <div className="col-12 col-lg-3 mb-5" key={course.id}>
                  <div className="wsisisi">
                    <Link
                      to="/course-preview"
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
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllCourses;
