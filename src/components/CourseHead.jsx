import React from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
const CourseHead = () => {
  return (
    <div>
      <div className="dance "></div>
      <div className="">
        <div className=" exppd">
          <div className="container">
            <div className="exp">Explore Our Course Categories</div>
            <div className="ynd">
              Start Designing Products that serves people, serves businesses
              from experts.
              <br /> Paquetes de autoedición y editores de páginas web usan el
              Lorem Ipsum como su <br /> texto por defecto, y al hacer una
              búsqueda .
            </div>
            <div>
              <div className="d-flex justify-content-center mt-4">
                <button className="all">
                  All categories <MdOutlineKeyboardArrowDown />{' '}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHead;