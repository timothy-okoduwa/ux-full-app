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
import { RiUploadCloudFill } from 'react-icons/ri';
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

const Two = () => {
  const [open, setOpen] = useState(false);
     const [sectionIndexToDelete, setSectionIndexToDelete] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open2, setOpen2] = useState(false);
const handleOpen2 = (index) => {
  setOpen2(true);
};

const handleClose2 = () => setOpen2(false);
  const [inputValue, setInputValue] = useState('');
  const [sections, setSections] = useState([]);
  const handleSave = () => {
    const newSection = {
      heading: inputValue,
      sectionContent: [],
    };
    setSections([...sections, newSection]);
    setInputValue('');
    handleClose();
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleSegmentClick = (sectionIndex, contentIndex) => {
    const newSectionContent = {}; // Create the new section content object based on your requirements
    const updatedSections = [...sections];
    updatedSections[sectionIndex].sectionContent.splice(
      contentIndex + 1,
      0,
      newSectionContent
    );
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
        {sections.map((section, index) => (
          <Accordion
            key={index}
            style={{
              backgroundColor: '#0E0E0E',
              borderRadius: '20px',
              marginBottom: '30px',
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className="expand" />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
              className="willo"
            >
              <Typography className="accordian-name w-100">
                {section.heading}
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
                    <button className="yes" onClick={() => click(index)}>
                      Yes
                    </button>
                    <button className="No" onClick={handleClose2}>
                      No
                    </button>
                  </div>
                </Typography>
              </Box>
            </Modal>
            {section.sectionContent.map((content, contentIndex) => (
              <AccordionDetails key={contentIndex}>
                <div className="mt-5 nsv">
                  <div className="row">
                    <div className="col-12 col-lg-6 mb-4">
                      <div>
                        <div className="subbz">Sub-Heading</div>
                        <div className="mt-3">
                          <input type="text" className="testxc" />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6 mb-4">
                      <div>
                        <div className="subbz">Sub-Heading</div>
                        <div className="mt-3">
                          <input type="text" className="testxc" />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 mb-4">
                      <div>
                        <div className="subbz">Sub-Heading</div>
                        <div className="mt-3">
                          <div className="lulu">
                            <div className="cloudesx mt-5">
                              <RiUploadCloudFill />
                            </div>
                            <div className="click">
                              Click “Upload” to upload video thumbnail
                            </div>
                            <button className="upload-Button">Upload</button>
                          </div>
                        </div>
                      </div>
                      <div>
                        <button
                          className="Delete"
                          onClick={() => handleDelete(index, contentIndex)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionDetails>
            ))}
            <div className="container">
              <div className="d-flex justify-content-start mt-4 mb-4">
                <button
                  className="next-button"
                  onClick={() => handleSegmentClick(index)}
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
    </div>
  );
};

export default Two;
