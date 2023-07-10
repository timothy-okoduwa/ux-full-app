import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';
const AvailableCourses = () => {
  let scrl = useRef(null);
  const [scrollX, setscrollX] = useState(0);
  const [scrolEnd, setscrolEnd] = useState(false);
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
            ? Object.values(data.Allcourses)
            : [];
          return [...accumulator, ...categoryCourses];
        }, []);

        // Set the courses state with the retrieved array
        setCourses(allCourses.slice(0, 2));
      }
    };

    fetchCourses();
  }, []);
  console.log(courses);
  //Slide click
  const slide = (shift) => {
    scrl.current.scrollLeft += shift;
    setscrollX(scrollX + shift);

    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  //Anim
  const anim = (e) => {
    gsap.from(e.target, { scale: 1 });
    gsap.to(e.target, { scale: 1.2 });
  };
  const anim2 = (e) => {
    gsap.from(e.target, { scale: 1.2 });
    gsap.to(e.target, { scale: 1 });
  };

  const scrollCheck = () => {
    setscrollX(scrl.current.scrollLeft);
    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };
  return (
    <div className="platme">
      <div className="container">
        <div className="ava mb-5">Avaliable Courses</div>

        <div className="putyty">
          <div className="man">
            {scrollX !== 0 && (
              <div className="gogo">
                <div
                  className="next"
                  onClick={() => slide(-300)}
                  onMouseEnter={(e) => anim(e)}
                  // onMouseLeave={(e) => anim2(e)}
                  onMouseLeave={(e) => anim2(e)}
                >
                  <MdArrowBackIosNew />
                </div>
              </div>
            )}
          </div>

          <div className="flex-up" ref={scrl} onScroll={scrollCheck}>
            <>
              {courses?.map((category) =>
                Object.values(category).map((course) => (
                  <Link
                    to={`/course-preview/${course.courseId}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <div
                      className="linear"
                      style={{ backgroundImage: `url(${course.thumbnailURL})` }}
                    >
                      <div className="change">
                        <div className="anita">{course.tutorName}</div>
                        <div className="ux">{course.nameOfCourse}</div>
                        <div className="hour">{course.Duration}</div>
                      </div>
                    </div>{' '}
                  </Link>
                ))
              )}
            </>
          </div>

          <div className="man">
            {!scrolEnd && (
              <div className="gogo2">
                <div
                  className="next2"
                  onClick={() => slide(+300)}
                  onMouseEnter={(e) => anim(e)}
                  onMouseLeave={(e) => anim2(e)}
                >
                  <MdArrowForwardIos />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-5">
        <Link to="/course">
          <button className="view">VIEW MORE</button>
        </Link>
      </div>
    </div>
  );
};

export default AvailableCourses;
