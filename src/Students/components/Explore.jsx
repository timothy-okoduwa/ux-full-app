import React from 'react'
import { BsPencilFill, BsTriangle } from 'react-icons/bs';
import { BiBookAlt } from 'react-icons/bi';
import { FiSmartphone } from 'react-icons/fi';
import { IoIosColorPalette } from 'react-icons/io';
import { RiArrowRightUpFill } from 'react-icons/ri';
import { CgNotes } from 'react-icons/cg';
import { TbTypography } from 'react-icons/tb';
const Explore = () => {
  return (
    <div className="going">
      <div className="container">
        <div className="exxxp mb-5">Explore our categories</div>

        <div className="row mt-5 ">
          <div className="col-12 col-lg-6 mb-4 d-flex justify-content-center">
            <div>
              <div className="backdu">
                <BsPencilFill className="pen" /> <span>UX Writing</span>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 mb-4 d-flex justify-content-center">
            <div>
              <div className="backdu">
                <FiSmartphone className="pen" /> <span>High Fidelity</span>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 mb-4 d-flex justify-content-center">
            <div>
              <div className="backdu">
                <BiBookAlt className="pen" /> <span>UX Research</span>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 mb-4 d-flex justify-content-center">
            <div>
              <div className="backdu">
                <IoIosColorPalette className="pen" /> <span>Colour Theory</span>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 mb-4 d-flex justify-content-center">
            <div>
              <div className="backdu">
                <RiArrowRightUpFill className="pen" /> <span>Prototyping</span>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 mb-4 d-flex justify-content-center">
            <div>
              <div className="backdu">
                <TbTypography className="pen" /> <span>Typography </span>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 mb-4 d-flex justify-content-center">
            <div>
              <div className="backdu">
                <CgNotes className="pen" /> <span>Wireframe</span>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 mb-4 d-flex justify-content-center">
            <div>
              <div className="backdu">
                <BsTriangle className="pen" /> <span>Iconography</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Explore