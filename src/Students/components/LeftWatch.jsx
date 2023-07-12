import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { BsFillPlayCircleFill } from 'react-icons/bs';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import '../components/LeftWatch.css';
const LeftWatch = ({ course, onSelectSubVideo }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  const handleSubHeadingClick = (subHeading) => {
    onSelectSubVideo(subHeading.subVideo);
    toggleSidebar();
  };

  return (
    <div>
      <div className={`ayh22 ${sidebarVisible ? 'show' : ''}`}>
        <div className="bmbmbmb">
          <div className="miltme">
            <button onClick={toggleSidebar} className="bubuf">
              <MdKeyboardArrowRight />
            </button>
          </div>
          <div className="nity22y">
            <div className="CoursesCourses">Courses Content</div>
          </div>

          <div className="mt-4">
            <div>
              {course?.sections?.map((section) => (
                <div className="nvfhd" key={section.heading}>
                  <Accordion className="produces-result">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>{section.heading}</Typography>
                    </AccordionSummary>
                    <AccordionDetails className="barrien">
                      {section?.segment?.map((segmentt) => (
                        <Typography
                          onClick={() => handleSubHeadingClick(segmentt)}
                          className="helloe"
                          key={segmentt.subHeading}
                        >
                          <div>
                            <BsFillPlayCircleFill
                              className={`influence ${
                                segmentt.isWatched ? 'watched' : ''
                              }`}
                            />
                            <span
                              className={`intoo ${
                                segmentt.isWatched ? 'watched' : ''
                              }`}
                            >
                              {segmentt.subHeading}
                            </span>
                          </div>
                          <div>
                            {segmentt.isWatched && (
                              <IoMdCheckmarkCircle className="lady" />
                            )}
                          </div>
                        </Typography>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftWatch;
