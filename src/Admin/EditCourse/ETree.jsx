import React, { useState, useEffect } from 'react';
import {
  getDoc,
  doc,
  updateDoc,
  getDocs,
  collection,
} from 'firebase/firestore';
import { db, auth } from '../../firebase';
import Typography from '@mui/material/Typography';
import { MdOutlineCancel } from 'react-icons/md';
import Accordion from '@mui/material/Accordion';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
const ETree = ({ courseId }) => {
  const [learn, setLearn] = useState(['']);
  const [requirement, setRequirement] = useState(['']);
  const [course, setCourse] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const docRef = doc(db, 'Admin', auth?.currentUser?.uid);
        const docSnap = await getDoc(docRef);
        console.log('docSnap:', docSnap);
        const adminData = docSnap.data();
        console.log('adminData:', adminData);
        const allCourses = adminData.Allcourses || {};
        console.log('allcourses :', allCourses);
        let selectedCourse = null;

        // Iterate over each array in allCourses
        for (const courseArrayKey in allCourses) {
          const courseArray = allCourses[courseArrayKey];
          // Search for the object with matching courseId
          selectedCourse = courseArray.find(
            (course) => course.courseId === courseId
          );
          if (selectedCourse) {
            // Break the loop if the object is found
            break;
          }
        }

        setCourse(selectedCourse || {});
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourse();
  }, [db, auth, courseId]);

  const handleAddUrl = (e) => {
    e.preventDefault();
    setCourse((prevCourse) => ({
      ...prevCourse,
      learn: [...prevCourse.learn, ''],
    }));
  };

  const handleUrlChange = (index, value) => {
    setCourse((prevCourse) => {
      const updatedUrls = [...prevCourse.learn];
      updatedUrls[index] = value;
      return {
        ...prevCourse,
        learn: updatedUrls,
      };
    });
  };

  const handleRemoveUrl = (index) => {
    setCourse((prevCourse) => {
      const updatedUrls = [...prevCourse.learn];
      updatedUrls.splice(index, 1);
      return {
        ...prevCourse,
        learn: updatedUrls,
      };
    });
  };

  const handleRequirement = (e) => {
    e.preventDefault();
    setCourse((prevCourse) => ({
      ...prevCourse,
      requirement: [...prevCourse.requirement, ''],
    }));
  };

  const handleRequirementChange = (index, value) => {
    setCourse((prevCourse) => {
      const updatedRequirements = [...prevCourse.requirement];
      updatedRequirements[index] = value;
      return {
        ...prevCourse,
        requirement: updatedRequirements,
      };
    });
  };

  const handleRemovRequirement = (index) => {
    setCourse((prevCourse) => {
      const updatedRequirements = [...prevCourse.requirement];
      updatedRequirements.splice(index, 1);
      return {
        ...prevCourse,
        requirement: updatedRequirements,
      };
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const docRef = doc(db, 'Admin', auth?.currentUser?.uid);
      const docSnap = await getDoc(docRef);
      const adminData = docSnap.data();
      const allCourses = { ...adminData.Allcourses }; // Clone the Allcourses object
      let updated = false;

      // Iterate over each array in allCourses
      for (const courseArrayKey in allCourses) {
        const courseArray = allCourses[courseArrayKey];
        // Search for the object with matching courseId
        const courseIndex = courseArray.findIndex(
          (course) => course.courseId === courseId
        );
        if (courseIndex !== -1) {
          // Update the specific course object
          courseArray[courseIndex] = { ...course };
          updated = true;
          break;
        }
      }

      if (!updated) {
        throw new Error(`Course with ID ${courseId} not found.`);
      }

      await updateDoc(docRef, { Allcourses: allCourses });
      // show success message
      // navigate('/dashboard');

      const studentCollectionRef = collection(db, 'student');
      const studentQuerySnapshot = await getDocs(studentCollectionRef);

      studentQuerySnapshot.forEach((studentDoc) => {
        const studentData = studentDoc.data();
        const purchasedCourses = studentData.purchasedCourses;

        purchasedCourses.forEach((courseP, index) => {
          if (courseP.courseId === courseId) {
            const updatedCourseP = { ...courseP, ...course };
            purchasedCourses[index] = updatedCourseP;
          }
        });

        updateDoc(studentDoc.ref, { purchasedCourses });
      });
    } catch (error) {
      console.error(error);
      // show error message
    } finally {
      setLoading(false);
    }
    navigate('/courses');
  };

  if (!course) {
    return null;
  }
  console.log('course:', course);

  return (
    <div>
      <div>
        <div className="design mb-5">
          {course.nameOfCourse} (
          <span style={{ fontSize: '16px' }}>{course.category}</span>)
        </div>
      </div>
      <div>
        <div className="row">
          <div className="col-12">
            <div>
              <Accordion
                style={{
                  width: '100%',
                  backgroundColor: '#0E0E0E',
                  borderRadius: '20px',
                  marginBottom: '30px',
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon className="expand" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  className="willo"
                >
                  <Typography className="accordian-name w-100">
                    What users will learn
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div>
                    {' '}
                    {course?.learn?.map((url, index) => (
                      <div className="randsom mt-3" key={index}>
                        <input
                          type="text"
                          className="feeelz"
                          value={url}
                          onChange={(e) =>
                            handleUrlChange(index, e.target.value)
                          }
                          placeholder={`Learn ${index + 1}`}
                        />
                        <div className="delete_part">
                          <MdOutlineCancel
                            className="expand"
                            onClick={() => handleRemoveUrl(index)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3">
                    <button className="next-button" onClick={handleAddUrl}>
                      {' '}
                      <AiOutlinePlusCircle className="mx-2" />
                      Add Lesson
                    </button>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>

          <div className="col-12">
            <div>
              <Accordion
                style={{
                  width: '100%',
                  backgroundColor: '#0E0E0E',
                  borderRadius: '20px',
                  marginBottom: '30px',
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon className="expand" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  className="willo"
                >
                  <Typography className="accordian-name w-100">
                    Requirement
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div>
                    {' '}
                    {course?.requirement?.map((req, index) => (
                      <div className="randsom mt-3" key={index}>
                        <input
                          type="text"
                          className="feeelz"
                          value={req}
                          onChange={(e) =>
                            handleRequirementChange(index, e.target.value)
                          }
                          placeholder={`requirement ${index + 1}`}
                        />
                        <div className="delete_part">
                          <MdOutlineCancel
                            className="expand"
                            onClick={() => handleRemovRequirement(index)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3">
                    <button className="next-button" onClick={handleRequirement}>
                      {' '}
                      {/* <AiOutlinePlusCircle className="mx-2" /> */}
                      Requirement
                    </button>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>

          <div className="col-12">
            <div>
              <Accordion
                style={{
                  width: '100%',
                  backgroundColor: '#0E0E0E',
                  borderRadius: '20px',
                  marginBottom: '30px',
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon className="expand" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  className="willo"
                >
                  <Typography className="accordian-name w-100">
                    Tutor Information
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="row">
                    <div className="col-12 col-lg-6">
                      <div>
                        <div className="cacus">Brief Description of Tutor</div>
                        <div>
                          <input
                            type="text"
                            name="tutorDescription"
                            className="feeelz"
                            value={course.tutorDescription}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div>
                        <div className="cacus">Tutor Name</div>
                        <div>
                          <input
                            type="text"
                            name="tutorName"
                            className="feeelz"
                            value={course.tutorName}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div>
                        <div className="cacus">Tutor Job Role</div>
                        <div>
                          <input
                            type="text"
                            name="tutorJob"
                            className="feeelz"
                            value={course.tutorJob}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>

          <div className="mt-4">
            <button className="next-button2" onClick={handleSubmit}>
              {/* Save */}
              {loading ? (
                <CircularProgress
                  style={{ height: '30px', width: '30px', color: 'white' }}
                />
              ) : (
                'save all changes'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ETree;
