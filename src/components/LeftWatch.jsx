import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { BsFillPlayCircleFill } from 'react-icons/bs';
import { MdKeyboardArrowRight } from 'react-icons/md';
const LeftWatch = () => {
  function toggleSidebar() {
    var sidebar = document.querySelector('.ayh');
    sidebar.classList.toggle('show');
  }
  return (
    <div style={{ position: 'relative' }}>
      <div className="ayh">
        <div>
          <div className="nity">
            <div className="CoursesCourses">Courses Content</div>
            <div>
              <button onClick={toggleSidebar} className="bubuf">
                <MdKeyboardArrowRight />
              </button>
            </div>
          </div>

          <div className="mt-4">
            <div>
              <div>
                <Accordion className="produces-result">
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Introduction</Typography>
                  </AccordionSummary>
                  <AccordionDetails className="barrien">
                    <Typography>
                      <div className="crty">
                        <BsFillPlayCircleFill className="influence" />
                        <span className="intto">intro </span>
                      </div>
                      <div className="crty">
                        <BsFillPlayCircleFill className="influence" />
                        <span className="intto">Who is this course for?</span>
                      </div>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion className="produces-result">
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography>UX Processes</Typography>
                  </AccordionSummary>
                  <AccordionDetails className="barrien">
                    <Typography>
                      <div className="crty">
                        <BsFillPlayCircleFill className="influence" />
                        <span className="intto">intro </span>
                      </div>
                      <div className="crty">
                        <BsFillPlayCircleFill className="influence" />
                        <span className="intto">Who is this course for?</span>
                      </div>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftWatch;
