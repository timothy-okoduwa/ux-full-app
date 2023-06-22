import React, { useState } from 'react';
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
// import { RiUploadCloudFill } from 'react-icons/ri';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase';
// import { Player, ControlBar, PlaybackRateMenuButton } from 'video-react';
import 'video-react/dist/video-react.css';
// import a from '../image/ux.svg';
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

const Two = ({ category, step, setStep, sections, setSections }) => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleSave = () => {
    const newSection = {
      heading: inputValue,
      sectionContent: [],
    };
    setSections([...sections, newSection]);
    setInputValue('');
    handleClose();
  };

  const handleSegmentClick = (sectionIndex) => {
    const newSegment = {
      subHeading: '',
      subDuration: '',
      subVideo: '',
      // Add other properties as needed
    };

    const updatedSections = [...sections];
    updatedSections[sectionIndex].sectionContent.push(newSegment);
    setSections(updatedSections);
  };

  const handleDelete = (sectionIndex, contentIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].sectionContent.splice(contentIndex, 1);
    setSections(updatedSections);
  };
  const click = (index) => {
    const updatedSections = [...sections];
    updatedSections.splice(index, 1);
    setSections(updatedSections);
    setOpen2(false);
  };
  // const uploadAllLocicToFirebase = async () => {
  //   try {
  //     const categoryRef = doc(db, 'Admin', auth.currentUser.uid);
  //     const existingCourse = await getDoc(categoryRef);
  //     const existingCourseData = existingCourse.data();

  //     const lastCourseIndex = existingCourseData[category]?.length - 1;

  //     if (lastCourseIndex !== undefined && lastCourseIndex >= 0) {
  //       const updatedSections = sections.map((section) => {
  //         const updatedSectionContent = section.sectionContent.map(
  //           (content) => {
  //             return {
  //               subHeading: content.subHeading,
  //               subDuration: content.subDuration,
  //               subVideo: content.subVideo,
  //               // Add other properties as needed
  //             };
  //           }
  //         );

  //         return {
  //           heading: section.heading,
  //           segment: updatedSectionContent,
  //         };
  //       });

  //       existingCourseData[category][lastCourseIndex].sections =
  //         updatedSections;

  //       await updateDoc(categoryRef, existingCourseData);
  //     }

  //     setStep(step + 1);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // Render the subHeading and subDuration inputs for each segment
  
  const uploadAllLocicToFirebase = async () => {
    try {
      const categoryRef = doc(db, 'Admin', auth.currentUser.uid);
      const existingCourse = await getDoc(categoryRef);
      const existingCourseData = existingCourse.data();

      const lastCourseIndex =
        existingCourseData.Allcourses[category]?.length - 1;

      if (lastCourseIndex !== undefined && lastCourseIndex >= 0) {
        const updatedSections = sections.map((section) => {
          const updatedSectionContent = section.sectionContent.map(
            (content) => {
              return {
                subHeading: content.subHeading,
                subDuration: content.subDuration,
                subVideo: content.subVideo,
                // Add other properties as needed
              };
            }
          );

          return {
            heading: section.heading,
            segment: updatedSectionContent,
          };
        });

        existingCourseData.Allcourses[category][lastCourseIndex].sections =
          updatedSections;

        await updateDoc(categoryRef, existingCourseData);
      }

      setStep(step + 1);
    } catch (error) {
      console.log(error.message);
    }
  };

  const renderSegments = (sectionIndex) => {
    const section = sections[sectionIndex];

    return section.sectionContent.map((content, contentIndex) => (
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
                    value={content.subHeading}
                    onChange={(e) =>
                      handleSubHeadingChange(
                        sectionIndex,
                        contentIndex,
                        e.target.value
                      )
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
                    value={content.subDuration}
                    onChange={(e) =>
                      handleSubDurationChange(
                        sectionIndex,
                        contentIndex,
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            </div>
            <div className="col-12   mb-4">
              <div>
                <div className="subbz">video url</div>
                <div className="mt-3">
                  <div className="row mb-3">
                    <div className="col-12 col-lg-6">
                      <input
                        type="text"
                        className="testxc"
                        value={content.subVideo}
                        onChange={(e) =>
                          handleSubVideoChange(
                            sectionIndex,
                            contentIndex,
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="col-12 col-lg-6"></div>
                  </div>
                  {content.subVideo && (
                    <div className="video_tag">
                      <div className="video-player-wrapper">
                        <div >
                          <video
                            src={content.subVideo}
                            controls
                            autoPlay
                            preload="auto"
                            controlsList="nodownload"
                            // onContextMenu="return false"
                            onContextMenu={(e) => e.preventDefault()}
                            className="video_tag"
                          ></video>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <button
                  className="Delete"
                  onClick={() => handleDelete(sectionIndex, contentIndex)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </AccordionDetails>
    ));
  };

  const handleSubHeadingChange = (sectionIndex, contentIndex, value) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].sectionContent[contentIndex].subHeading =
      value;
    setSections(updatedSections);
  };

  const handleSubDurationChange = (sectionIndex, contentIndex, value) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].sectionContent[contentIndex].subDuration =
      value;
    setSections(updatedSections);
  };
  const handleSubVideoChange = (sectionIndex, contentIndex, value) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].sectionContent[contentIndex].subVideo = value;
    setSections(updatedSections);
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
              <input
                type="text"
                className="goku"
                value={inputValue}
                onChange={handleInputChange}
              />
            </div>
            <div className="mt-4 mb-4">
              <button
                className="save"
                onClick={handleSave}
                disabled={inputValue.trim() === ''}
              >
                Save
              </button>
            </div>
          </div>
        </Box>
      </Modal>
      {sections.length === 0 && (
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
        {sections.map((section, sectionIndex) => (
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
                {section.heading} ({section.sectionContent.length} Segment)
              </Typography>
              <MdDelete
                className="expand"
                onClick={handleOpen2}
                style={{ marginRight: '40px' }}
              />
            </AccordionSummary>
            <Modal
              open={open2}
              onClose={handleClose2}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style2}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Are you sure you want to delete this section?
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <div className="d-mark">
                    <button className="yes" onClick={() => click(sectionIndex)}>
                      Yes
                    </button>
                    <button className="No" onClick={handleClose2}>
                      No
                    </button>
                  </div>
                </Typography>
              </Box>
            </Modal>
            {renderSegments(sectionIndex)}

            <div className="container">
              <div className="d-flex justify-content-start mt-4 mb-4">
                <button
                  className="next-button"
                  onClick={() => handleSegmentClick(sectionIndex)}
                >
                  {' '}
                  <AiOutlinePlusCircle className="mx-2" />
                  Segement
                </button>
              </div>
            </div>
          </Accordion>
        ))}
      </div>
      <button className="next-button" onClick={uploadAllLocicToFirebase}>
        Next
      </button>
    </div>
  );
};

export default Two;
