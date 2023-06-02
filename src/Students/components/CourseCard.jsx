import React from 'react';
import { AiFillPlayCircle } from 'react-icons/ai';
import { MdCancel } from 'react-icons/md';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import p from '../pages/images/pexels.mp4';
import { Link } from 'react-router-dom';

const CourseCard = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          style={{
            width: '100%',
            height: '400px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className=" kissone">
            <div className=" kissonee">
              <span className="backseat">
                {' '}
                <MdCancel onClick={handleClose} />
              </span>
              <video
                src={p}
                autoPlay
                loop={false}
                controls
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </div>
          </div>
        </Box>
      </Modal>
      <div className="container">
        <div className="corner">
          <div className="container">
            <div className="row pt-5">
              <div className="col-12 col-lg-6">
                <div className="dyna">
                  <div className="namee">Vincent Babs</div>
                  <div className="tittle">Design Thinking</div>
                  <div className="timee">2hr 30mins</div>
                </div>
                <div className="mt-4">
                  <div>
                    <div className="priced">₦5,000</div>
                    <div className="d-flex mt-4">
                      <Link to="/purchase-course" style={{textDecoration:'none'}}>
                        <button className="buy-now">BUY NOW</button>
                      </Link>

                      <button className="watch" onClick={handleOpen}>
                        {' '}
                        <AiFillPlayCircle className="playna" /> WATCH PREVIEW
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
