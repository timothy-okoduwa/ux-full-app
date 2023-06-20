import React, { useState } from 'react';
import { RiUploadCloudFill } from 'react-icons/ri';
import { TiTimes } from 'react-icons/ti';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { MdOutlineCancel } from 'react-icons/md';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db, auth, storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { courseId } from './One';
import { useNavigate } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const style = {
  position: 'absolute ',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#191919',
  boxShadow: 24,
  borderRadius: '20px',
  p: 4,
};
const Three = ({ category }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [learn, setLearn] = useState(['']);
  const [requirement, setRequirement] = useState(['']);
  const [tutorDescription, setTutorDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
const [tutorName, setTutorName]=useState('')
const [tutorJob,setTutorJob]=useState('')
  const handleAddUrl = (e) => {
    e.preventDefault();
    setLearn([...learn, '']);
  };

  const handleUrlChange = (index, value) => {
    const urls = [...learn];
    urls[index] = value;
    setLearn(urls);
  };

  const handleRemoveUrl = (index) => {
    const urls = [...learn];
    urls.splice(index, 1);
    setLearn(urls);
  };
  const handleRequirement = (e) => {
    e.preventDefault();
    setRequirement([...requirement, '']);
  };

  const handleRequirementChange = (index, value) => {
    const reqss = [...requirement];
    reqss[index] = value;
    setRequirement(reqss);
  };

  const handleRemovRequirement = (index) => {
    const reqss = [...requirement];
    reqss.splice(index, 1);
    setRequirement(reqss);
  };

  let courseIdToUpdate = courseId;
  const navigate = useNavigate();
  const resetStateAndStorage = () => {
    handleOpen();
  };
  const clickable = () => {
    navigate('/uploads');
    window.location.reload();
  };
  const move = async () => {
    try {
      const categoryRef = doc(db, 'Admin', auth.currentUser.uid);

      // Upload the image to Firebase Storage if a selected image exists
      let thumbnailURL = '';
      if (selectedImage) {
        const storageRef = ref(
          storage,
          `tutorImage/${auth.currentUser.uid}/${Date.now()}`
        );
        const uploadSnapshot = await uploadBytes(storageRef, selectedImage);
        const downloadURL = await getDownloadURL(uploadSnapshot.ref);
        thumbnailURL = downloadURL;
      }

      // Get the existing course info from the category document
      const categoryDoc = await getDoc(categoryRef);
      if (categoryDoc.exists()) {
        const categoryData = categoryDoc.data();
        const existingCourses = categoryData[category] || []; // Get the existing courses array
        const updatedCourses = existingCourses.map((course) => {
          // Find the course to update by comparing some unique identifier (e.g., course ID)
          if (course.courseId === courseIdToUpdate) {
            // Update the specific course with the additional fields
            return {
              ...course,
              learn: learn,
              requirement: requirement,
              tutorDescription: tutorDescription,
              tutorName:tutorName,
              tutorJob:tutorJob,
              InstructorImage: thumbnailURL,
            };
          }
          return course;
        });

        // Update the category document in Firestore with the updated courses array
        await updateDoc(categoryRef, {
          [category]: updatedCourses,
        });
      } else {
        console.log('Category not found.');
      }
      // console.log(courseIdToUpdate);
      resetStateAndStorage();

      // Move to the next step
      courseIdToUpdate = null;
    } catch (error) {
      // Handle any errors
      console.log(error);
    }
  };
  //
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };
  return (
    <div>
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
                    {learn.map((url, index) => (
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
                    {requirement.map((req, index) => (
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
                            onClick={()=>handleRemovRequirement(index)}
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
                            className="feeelz"
                            value={tutorDescription}
                            onChange={(e) =>
                              setTutorDescription(e.target.value)
                            }
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
                            className="feeelz"
                            value={tutorName}
                            onChange={(e) => setTutorName(e.target.value)}
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
                            className="feeelz"
                            value={tutorJob}
                            onChange={(e) => setTutorJob(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>

          <div className="col-12 mb-4">
            <div>
              <div className="cacus">Tutor Image</div>
              <div>
                <div className="forImahe ">
                  <div className="broken-line">
                    {selectedImage ? (
                      <div className="uploaded-image-container">
                        <div
                          className="close-button"
                          onClick={() => setSelectedImage(null)}
                        >
                          <TiTimes />
                        </div>
                        <img
                          src={URL.createObjectURL(selectedImage)}
                          alt="Thumbnail"
                          className="uploaded-image"
                        />
                      </div>
                    ) : (
                      <div className="flips">
                        {' '}
                        <div className="cloudesx mt-5">
                          <RiUploadCloudFill />
                        </div>
                        <div className="click">
                          Click “Upload” to upload video thumbnail
                        </div>
                        <label
                          className="upload-Button"
                          htmlFor="thumbNailUpload"
                        >
                          Upload
                        </label>
                        <input
                          type="file"
                          id="thumbNailUpload"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={handleImageUpload}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <button className="next-button" onClick={move}>
              Save
            </button>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div className="over-to-center">
              <BsFillCheckCircleFill />
            </div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="success_message">
              You’ve successfully created this course.
            </div>
            <div className="d-flex justify-content-center">
              <button className="continue" onClick={clickable}>
                Continue
              </button>
            </div>
            <div className="d-flex justify-content-center">
              <button className="cancle" onClick={clickable}>
                Cancel
              </button>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default Three;
