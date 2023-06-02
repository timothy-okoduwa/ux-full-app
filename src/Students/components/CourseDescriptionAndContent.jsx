import React from 'react';
import { AiFillPlayCircle } from 'react-icons/ai';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const CourseDescriptionAndContent = () => {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-6 mb-5">
            <div className="coursed">Course Description</div>
            <div>
              <div className="por-que">
                Por qué lo usamos Es un hecho establecido hace demasiado tiempo
                que un lector se distraerá con el contenido del texto de un
                sitio mientras que mira su diseño. El punto de usar Lorem Ipsum
                es que tiene una distribución más o menos normal de las letras,
                al contrario de usar textos como por ejemplo "Contenido aquí,
                contenido aquí". Estos textos hacen parecerlo un español que se
                puede leer. Muchos paquetes de autoedición y editores de páginas
                web usan el Lorem Ipsum como su texto por defecto, y al hacer
                una búsqueda .
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 mb-4">
            <div className="coursed">Courses Content</div>

            <div className=" container vibess">
              <div className="temper">
                <AiFillPlayCircle className="nana" />{' '}
                <span className="wines">Course Preview</span>
              </div>
              <div className="boyo">
                <Accordion className="hmmm">
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon className="introvid" />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className="introvid">
                      <AiFillPlayCircle className="nana" />
                      Introduction
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className="ouya">
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse malesuada lacus ex, sit amet blandit leo
                      lobortis eget.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
              <div className="boyo">
                <Accordion className="hmmm">
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon className="introvid" />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className="introvid">
                      <AiFillPlayCircle className="nana" />
                      UX Processes
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className="ouya">
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse malesuada lacus ex, sit amet blandit leo
                      lobortis eget.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
              <div className="boyo">
                <Accordion className="hmmm">
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon className="introvid" />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className="introvid">
                      <AiFillPlayCircle className="nana" />
                      Wireframe
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className="ouya">
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse malesuada lacus ex, sit amet blandit leo
                      lobortis eget.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
              <div className="boyo">
                <Accordion className="hmmm">
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon className="introvid" />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className="introvid">
                      <AiFillPlayCircle className="nana" />
                      HIFI & UI Design
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className="ouya">
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse malesuada lacus ex, sit amet blandit leo
                      lobortis eget.
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

export default CourseDescriptionAndContent;
