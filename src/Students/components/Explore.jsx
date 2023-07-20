import React from 'react';
import { BsPencilFill, BsTriangle } from 'react-icons/bs';
import { BiBookAlt } from 'react-icons/bi';
import { FiSmartphone } from 'react-icons/fi';
import { IoIosColorPalette } from 'react-icons/io';
import { RiArrowRightUpFill } from 'react-icons/ri';
import { CgNotes } from 'react-icons/cg';
import { TbTypography } from 'react-icons/tb';
import { Link } from 'react-router-dom';
const Explore = () => {
  return (
    <div className="going">
      <div className="container">
        <div className="exxxp mb-5">Explore our categories</div>

        <div className="row mt-5 ">
          <div className="col-12 col-lg-6 mb-4 d-flex justify-content-center">
            <div>
              <Link
                to="/course-category?category=UX Design"
                style={{ textDecoration: 'none' }}
              >
                <div className="backdu">
                  <BsPencilFill className="pen" /> <span>UX Writing</span>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-12 col-lg-6 mb-4 d-flex justify-content-center">
            <div>
              <Link
                to="/course-category?category=High Fidelity"
                style={{ textDecoration: 'none' }}
              >
                <div className="backdu">
                  <FiSmartphone className="pen" /> <span>High Fidelity</span>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-12 col-lg-6 mb-4 d-flex justify-content-center">
            <div>
              <Link
                to="/course-category?category=UX Research"
                style={{ textDecoration: 'none' }}
              >
                <div className="backdu">
                  <BiBookAlt className="pen" /> <span>UX Research</span>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-12 col-lg-6 mb-4 d-flex justify-content-center">
            <div>
              <Link
                to="/course-category?category=Colour Theory"
                style={{ textDecoration: 'none' }}
              >
                <div className="backdu">
                  <IoIosColorPalette className="pen" />{' '}
                  <span>Colour Theory</span>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-12 col-lg-6 mb-4 d-flex justify-content-center">
            <div>
              <Link
                to="/course-category?category=Prototyping"
                style={{ textDecoration: 'none' }}
              >
                <div className="backdu">
                  <RiArrowRightUpFill className="pen" />{' '}
                  <span>Prototyping</span>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-12 col-lg-6 mb-4 d-flex justify-content-center">
            <div>
              <Link
                to="/course-category?category=Typography"
                style={{ textDecoration: 'none' }}
              >
                <div className="backdu">
                  <TbTypography className="pen" /> <span>Typography </span>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-12 col-lg-6 mb-4 d-flex justify-content-center">
            <div>
              <Link
                to="/course-category?category=Wireframe"
                style={{ textDecoration: 'none' }}
              >
                <div className="backdu">
                  <CgNotes className="pen" /> <span>Wireframe</span>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-12 col-lg-6 mb-4 d-flex justify-content-center">
            <div>
              <Link
                to="/course-category?category=UI Design"
                style={{ textDecoration: 'none' }}
              >
                <div className="backdu">
                  <BsTriangle className="pen" /> <span>Ui Design</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
