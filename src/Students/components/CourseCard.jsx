import React, { useState } from 'react';
import { AiFillPlayCircle } from 'react-icons/ai';
import { MdCancel } from 'react-icons/md';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import p from '../pages/images/pexels.mp4';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const [open, setOpen] = useState(false);

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
          <div className="kissone">
            <div className="kissonee">
              <span className="backseat">
                <MdCancel onClick={handleClose} />
              </span>
              <video
                src={course.previewVideo || p}
                autoPlay
                loop={false}
                controls
                preload="auto"
                controlsList="nodownload"
                onContextMenu={(e) => e.preventDefault()}
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
      <div className="container mb-5">
        <div
          className="corner"
          style={{
            backgroundImage: `url(${course.thumbnailURL})`,
          }}
        >
          <div className="container">
            <div className="row pt-5">
              <div className="col-12 col-lg-6">
                <div className="dyna">
                  <div className="namee">{course.tutorName}</div>
                  <div className="tittle">{course.nameOfCourse}</div>
                  <div className="timee">{course.Duration}</div>
                </div>
                <div className="mt-4">
                  <div>
                    <div className="priced">
                      ₦{parseFloat(course.price).toLocaleString()}
                    </div>
                    <div className="d-flex mt-4">
                      <Link
                        // to="/purchase-course"
                        to={`/purchase-course/${course.courseId}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <button className="buy-now">BUY NOW</button>
                      </Link>
                      <button className="watch" onClick={handleOpen}>
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
