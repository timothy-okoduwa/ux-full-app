import React, { useState } from 'react';
import { RiUploadCloudFill } from 'react-icons/ri';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { BsFillCheckCircleFill } from 'react-icons/bs';
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
const Three = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <div>
        <div className="row">
          <div className="col-12 col-lg-6">
            <div>
              <div className="cacus">What users will learn</div>
              <div>
                <input type="text" className="feeelz" />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div>
              <div className="cacus">Requirement</div>
              <div>
                <input type="text" className="feeelz" />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div>
              <div className="cacus">Brief Description of Tutor</div>
              <div>
                <input type="text" className="feeelz" />
              </div>
            </div>
          </div>

          <div className="col-12 mb-4">
            <div>
              <div className="cacus">Tutor Image</div>
              <div>
                <div className="forImahe ">
                  <div className="broken-line">
                    <div className="cloudesx mt-5">
                      <RiUploadCloudFill />
                    </div>
                    <div className="click">
                      Click “Upload” to upload course preview video
                    </div>
                    <button className="upload-Button">Upload</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <button className="next-button" onClick={handleOpen}>
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
              <button className="continue">Continue</button>
            </div>
            <div className="d-flex justify-content-center">
              <button className="cancle">Cancel</button>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default Three;
