import React, { useState, useEffect } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { FaTimes } from 'react-icons/fa';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Modal from '@mui/material/Modal';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase';

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
const style2 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '9px',
  p: 4,
};

const ETwo = ({ courseId }) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [sections, setSections] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [course, setCourse] = useState({});
  // const [editedSubDuration, setEditedSubDuration] = useState('');
  // const [editedSubHeading, setEditedSubHeading] = useState('');
  // const [editedSubVideo, setEditedSubVideo] = useState('');
  const [loading, setLoading] = useState(false);
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
    const section = course.sections[sectionIndex];

    return section.segment.map((content, contentIndex) => (
      <AccordionDetails key={contentIndex}>
        <div className="mt-5 nsv">
          <div className="row">
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
                            src={ content.subVideo}
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
            </div>
          </div>
        </div>
      </AccordionDetails>
    ));
  };


const handleSubmit = async (event) => {
  event.preventDefault();

  // Access the updated values from the course state
  const subVideo = course.sections.flatMap((section) =>
    section.segment.map((content) => content.subVideo)
  );
  const subDuration = course.sections.flatMap((section) =>
    section.segment.map((content) => content.subDuration)
  );
  const subHeading = course.sections.flatMap((section) =>
    section.segment.map((content) => content.subHeading)
  );

  console.log('subVideo:', subVideo);
  console.log('subDuration:', subDuration);
  console.log('subHeading:', subHeading);

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
        // Get the specific course object
        const course = courseArray[courseIndex];

        // Iterate over each section in the course
        for (const section of course.sections) {
          // Update all segments within the section
          section.segment = section.segment.map((segment, segmentIndex) => {
            const updatedSegment = {
              ...segment,
              subDuration: subDuration[segmentIndex],
              subHeading: subHeading[segmentIndex],
              subVideo: subVideo[segmentIndex],
            };
            return updatedSegment;
          });
        }

        // Update the course object in the array
        courseArray[courseIndex] = course;

        updated = true;
        break;
      }
    }

    if (!updated) {
      throw new Error('Course not found.');
    }

    await updateDoc(docRef, { Allcourses: allCourses });
    // show success message
    // navigate('/')
  } catch (error) {
    console.error(error);
    // show error message
  } finally {
    setLoading(false);
  }
};
  return (
    <div>
      <div>
        <div className="design">Design Thinking</div>
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
              <input type="text" className="goku" value={inputValue} />
            </div>
            <div className="mt-4 mb-4">
              <button className="save" disabled={inputValue.trim() === ''}>
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
        
            {renderSegments(sectionIndex)}

            <div className="container">
              <div className="d-flex justify-content-start mt-4 mb-4">
                <button className="next-button">
                  {' '}
                  <AiOutlinePlusCircle className="mx-2" />
                  Segement
                </button>
              </div>
            </div>
          </Accordion>
        ))}
      </div>
      <button className="next-button" onClick={handleSubmit}>
        Next
      </button>
    </div>
  );
};

export default ETwo;
