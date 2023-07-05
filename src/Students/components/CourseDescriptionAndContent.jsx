import React from 'react';
import { AiFillPlayCircle } from 'react-icons/ai';
import { BsLockFill } from 'react-icons/bs';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CourseDescriptionAndContent = ({ course }) => {
  // console.log(course?.sections?.segments?.subHeading);
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-6 mb-5">
            <div className="coursed pb-3">Course Description</div>
            <div>
              <div className="por-que">{course.courseDescription}</div>
            </div>
          </div>
          <div className="col-12 col-lg-6 mb-4">
            <div className="coursed pb-3">Courses Content</div>

            <div className="container vibess">
              <div className="temper">
                <AiFillPlayCircle className="nana" />{' '}
                <span className="wines">Course Preview</span>
              </div>
              {course?.sections?.map((section) => (
                <div className="boyo" key={section.sectionId}>
                  <Accordion className="hmmm">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon className="introvid" />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className="introvid">
                        <AiFillPlayCircle className="nana" />
                        {section.heading}
                      </Typography>
                    </AccordionSummary>

                    <AccordionDetails className="ouya">
                      {section?.segment?.map((segmentt) => (
                        <Typography key={segmentt.segmentId}>
                          <div className="datys mt-2 mb-2">
                            <span>
                              <BsLockFill />
                            </span>{' '}
                            <span className="px-3">{segmentt.subHeading}</span>
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

export default CourseDescriptionAndContent;
