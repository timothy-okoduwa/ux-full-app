import React, { useState, useEffect } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { BsFillPlusCircleFill } from 'react-icons/bs';
// import { MdDelete } from 'react-icons/md';
import { FaTimes } from 'react-icons/fa';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Modal from '@mui/material/Modal';
import {
  getDoc,
  doc,
  updateDoc,
  getDocs,
  collection,
} from 'firebase/firestore';
import { db, auth } from '../../firebase';
import { v4 as generateUniqueId } from 'uuid';
import CircularProgress from '@mui/material/CircularProgress';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#0E0E0E',
  borderRadius: '20px',
  boxShadow: 24,
};
// const style2 = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   borderRadius: '9px',
//   p: 4,
// };

const ETwo = ({ courseId, step, setStep }) => {
  const [open, setOpen] = useState(false);
  // const [inputValue, setInputValue] = useState('');
  // const [sections, setSections] = useState([]);
  const [newSectionHeading, setNewSectionHeading] = useState('');
  const handleOpen = () => {
    setOpen(true);
    setNewSectionHeading('');
  };
  const handleClose = () => setOpen(false);
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeSectionIndex, setActiveSectionIndex] = useState(null);
  const [newlyCreatedSegments, setNewlyCreatedSegments] = useState([]);
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const docRef = doc(db, 'Admin', auth?.currentUser?.uid);
        const docSnap = await getDoc(docRef);
        // console.log('docSnap:', docSnap);
        const adminData = docSnap.data();
        // console.log('adminData:', adminData);
        const allCourses = adminData.Allcourses || {};
        // console.log('allcourses :', allCourses);
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

  // console.log('ETwo code:', course);

  const handleChange = (event, sectionIndex, contentIndex) => {
    const { name, value } = event.target;
    setCourse((prevCourse) => {
      const updatedSections = prevCourse.sections.map((section, sIndex) => {
        if (sIndex === sectionIndex) {
          const updatedSegment = section.segment.map((content, cIndex) => {
            if (cIndex === contentIndex) {
              return {
                ...content,
                [name]: value,
              };
            }
            return content;
          });
          return {
            ...section,
            segment: updatedSegment,
          };
        }
        return section;
      });

      return {
        ...prevCourse,
        sections: updatedSections,
      };
    });
  };

  const renderSegments = (sectionIndex) => {
    const section = course?.sections[sectionIndex];

    return (
      <div className="mt-5 nsv">
        <div className="row">
          {section?.segment?.map((content, contentIndex) => (
            <React.Fragment key={contentIndex}>
              {/* Render the segments based on the course state */}
              <div className="col-12 col-lg-6 mb-4">
                <div>
                  <div className="subbz">Sub-Heading</div>
                  <div className="mt-3">
                    <input
                      type="text"
                      className="testxc"
                      name="subHeading"
                      value={content.subHeading}
                      onChange={(event) =>
                        handleChange(event, sectionIndex, contentIndex)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6 mb-4">
                <div>
                  <div className="subbz">Duration</div>
                  <div className="mt-3">
                    <input
                      type="text"
                      className="testxc"
                      name="subDuration"
                      value={content.subDuration}
                      onChange={(event) =>
                        handleChange(event, sectionIndex, contentIndex)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="col-12   mb-4">
                <div>
                  <div className="subbz">Video URL</div>
                  <div className="mt-3">
                    <div className="row mb-3">
                      <div className="col-12 col-lg-6">
                        <input
                          type="text"
                          className="testxc"
                          name="subVideo"
                          value={content.subVideo}
                          onChange={(event) =>
                            handleChange(event, sectionIndex, contentIndex)
                          }
                        />
                      </div>
                      <div className="col-12 col-lg-6"></div>
                    </div>
                    {content.subVideo && (
                      <div className="video_tag">
                        <div className="video-player-wrapper">
                          <div>
                            <video
                              src={content.subVideo}
                              controls
                              autoPlay
                              preload="auto"
                              controlsList="nodownload"
                              onContextMenu={(e) => e.preventDefault()}
                              className="video_tag"
                            ></video>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  className="Delete"
                  onClick={() => handleDelete(sectionIndex, contentIndex)}
                  disabled={!newlyCreatedSegments.includes(content)}
                >
                  Delete
                </button>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const docRef = doc(db, 'Admin', auth?.currentUser?.uid);
      const docSnap = await getDoc(docRef);
      const adminData = docSnap.data();
      const allCourses = { ...adminData.Allcourses }; // Clone the Allcourses object

      let courseArrayKey;
      let courseIndex;

      // Find the course array and course index for the current courseId
      for (const key in allCourses) {
        const array = allCourses[key];
        const index = array.findIndex((course) => course.courseId === courseId);
        if (index !== -1) {
          courseArrayKey = key;
          courseIndex = index;
          break;
        }
      }

      if (courseArrayKey && courseIndex !== -1) {
        const updatedSections = course.sections.map((section) => {
          const updatedSegment = section.segment.map((segment) => {
            const { subHeading, subDuration, subVideo } = segment;
            return {
              subHeading,
              subDuration,
              subVideo,
              // Add additional properties or modify existing properties as needed
            };
          });

          return {
            heading: section.heading,
            segment: updatedSegment,
          };
        });

        const updatedCourse = {
          ...course,
          sections: updatedSections,
        };

        // Check if there are any newly created sections or segments
        const hasNewSections =
          updatedCourse.sections.length > course.sections.length;
        const hasNewSegments =
          updatedCourse.sections.flatMap((section) => section.segment).length >
          course.sections.flatMap((section) => section.segment).length;

        // If there are newly created sections or segments, add them to the updated course
        if (hasNewSections || hasNewSegments) {
          updatedCourse.sections = updatedCourse.sections.map((section) => {
            // Check if the section is newly created
            const isNewSection = !course.sections.some(
              (s) => s.heading === section.heading
            );

            if (isNewSection) {
              const sectionId = generateUniqueId(); // Generate a unique ID for the new section
              return {
                ...section,
                sectionId,
              };
            } else {
              // Check if there are any newly created segments within the existing sections
              const hasNewSegments =
                section.segment.length >
                course.sections.find((s) => s.heading === section.heading)
                  .segment.length;

              // If there are newly created segments, add them to the updated section
              if (hasNewSegments) {
                const updatedSegment = section.segment.map((segment) => {
                  const isNewSegment = !course.sections
                    .find((s) => s.heading === section.heading)
                    .segment.some((s) => s.subHeading === segment.subHeading);
                  if (isNewSegment) {
                    const segmentId = generateUniqueId(); // Generate a unique ID for the new segment
                    return {
                      ...segment,
                      segmentId,
                    };
                  } else {
                    // Update the properties of the existing segment
                    return {
                      ...segment,
                      // Add additional properties or modify existing properties as needed
                    };
                  }
                });

                return {
                  ...section,
                  segment: updatedSegment,
                };
              } else {
                return section;
              }
            }
          });
        }

        allCourses[courseArrayKey][courseIndex] = updatedCourse;

        await updateDoc(docRef, {
          Allcourses: allCourses,
        });

        // Retrieve the student documents with the matching courseId
        const studentsRef = collection(db, 'student');
        const studentsSnapshot = await getDocs(studentsRef);

        const updates = [];

        studentsSnapshot.forEach((doc) => {
          const studentData = doc.data();
          const purchasedCourses = studentData.purchasedCourses || [];

          // Find the purchasedCourse object with matching courseId
          const updatedPurchasedCourses = purchasedCourses.map((coursep) => {
            if (coursep.courseId === courseId) {
              console.log('matched course :', coursep);
              // Update the sections array in the purchasedCourse object
              const updatedSections = coursep.sections.map((section) => {
                // Update the properties of the section object as needed
                // ... Your logic to update sections ...
                return {
                  ...section,
                  // Add additional properties or modify existing properties as needed
                };
              });

              return {
                ...coursep,
                sections: updatedSections,
              };
            }

            return coursep;
          });

          // Update the student document with the modified purchasedCourses array
          const studentRef = doc(db, 'student', doc.id);
          updates.push(
            updateDoc(studentRef, {
              purchasedCourses: updatedPurchasedCourses,
            })
          );
        });

        // Execute all the update operations in parallel
        await Promise.all(updates);
      } else {
        throw new Error('Course not found.');
      }
    } catch (error) {
      console.error(error);
      // show error message
    } finally {
      setLoading(false);
    }
    setStep(step + 1);
  };

  const handleAddSection = () => {
    const newSection = {
      heading: newSectionHeading,
      segment: [],
    };

    setCourse((prevCourse) => ({
      ...prevCourse,
      sections: [...prevCourse.sections, newSection],
    }));

    handleClose();
  };

  const handleAddSegment = (sectionIndex) => {
    setCourse((prevCourse) => {
      const updatedSections = [...prevCourse.sections];
      const newSegment = {
        subHeading: '',
        subDuration: '',
        subVideo: '',
      };
      updatedSections[sectionIndex] = {
        ...updatedSections[sectionIndex],
        segment: [...updatedSections[sectionIndex].segment, newSegment],
      };
      setNewlyCreatedSegments((prevSegments) => [...prevSegments, newSegment]);
      return {
        ...prevCourse,
        sections: updatedSections,
      };
    });
  };
  const handleDelete = (sectionIndex, contentIndex) => {
    // Check if the segment is a newly created segment
    const isSegmentNewlyCreated =
      contentIndex >= course.sections[sectionIndex].segment.length;

    if (isSegmentNewlyCreated) {
      // Remove the segment from the newly created segments state
      setNewlyCreatedSegments((prevSegments) =>
        prevSegments.filter((_, index) => index !== contentIndex)
      );
    }

    setCourse((prevCourse) => {
      const updatedSections = [...prevCourse.sections];
      updatedSections[sectionIndex].segment.splice(contentIndex, 1);

      return {
        ...prevCourse,
        sections: updatedSections,
      };
    });
  };
  return (
    <div>
      <div>
        <div className="design">
          {course.nameOfCourse} (
          <span style={{ fontSize: '16px' }}>{course.category}</span>)
        </div>
      </div>
      <div className="d-flex justify-content-end mt-4">
        <button className="next-button" onClick={handleOpen}>
          {' '}
          <AiOutlinePlusCircle className="mx-2" />
          Section
        </button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="upper">
            <div className="container">
              <div className="row">
                <div className="col-12 col-sm-10">
                  <div className="calories">
                    <div>Create Sub-Heading</div>
                  </div>
                </div>
                <div className="col-12 col-sm-2">
                  <div className="times">
                    <FaTimes onClick={handleClose} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="subb">Sub-Heading</div>
            <div>
              <input
                type="text"
                className="goku"
                value={newSectionHeading}
                onChange={(event) => setNewSectionHeading(event.target.value)}
              />
            </div>
            <div className="mt-4 mb-4">
              <button
                className="save"
                disabled={newSectionHeading.trim() === ''}
                onClick={handleAddSection}
              >
                Save
              </button>
            </div>
          </div>
        </Box>
      </Modal>

      {course?.sections?.length === 0 && (
        <div className="plus">
          <div className="sects">
            <div>
              <BsFillPlusCircleFill className="aifill" />
            </div>
            <div className="seeULater">Add a new Section</div>
          </div>
        </div>
      )}

      <div className="mt-4">
        {course?.sections?.map((section, sectionIndex) => (
          <Accordion
            key={sectionIndex}
            expanded={activeSectionIndex === sectionIndex}
            onChange={() =>
              setActiveSectionIndex(
                activeSectionIndex === sectionIndex ? null : sectionIndex
              )
            }
            style={{
              backgroundColor: '#0E0E0E',
              borderRadius: '20px',
              marginBottom: '30px',
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className="expand" />}
              aria-controls={`panel${sectionIndex}-content`}
              id={`panel${sectionIndex}-header`}
              className="willo"
            >
              <Typography className="accordian-name w-100">
                {section.heading} ({section?.segment?.length}{' '}
                {section?.segment?.length > 1 ? 'segments' : 'segment'})
              </Typography>
            </AccordionSummary>
            <AccordionDetails>{renderSegments(sectionIndex)}</AccordionDetails>

            <div className="container">
              <div className="d-flex justify-content-start mt-4 mb-4">
                <button
                  className="next-button"
                  onClick={() => handleAddSegment(sectionIndex)}
                >
                  <AiOutlinePlusCircle className="mx-2" />
                  Segment
                </button>
              </div>
            </div>
          </Accordion>
        ))}
      </div>
      <button className="next-button" onClick={handleSubmit}>
        {loading ? (
          <CircularProgress
            style={{ height: '30px', width: '30px', color: 'white' }}
          />
        ) : (
          'Next'
        )}
      </button>
    </div>
  );
};

export default ETwo;
