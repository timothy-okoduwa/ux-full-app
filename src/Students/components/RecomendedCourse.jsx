import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
const RecommendedCourse = () => {
  let scrl = useRef(null);
  const [scrollX, setscrollX] = useState(0);
  const [scrolEnd, setscrolEnd] = useState(false);

  //Slide click
  const slide = (shift) => {
    scrl.current.scrollLeft += shift;
    setscrollX(scrollX + shift);

    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  //Anim
  const anim = (e) => {
    gsap.from(e.target, { scale: 1 });
    gsap.to(e.target, { scale: 1.2 });
  };
  const anim2 = (e) => {
    gsap.from(e.target, { scale: 1.2 });
    gsap.to(e.target, { scale: 1 });
  };

  const scrollCheck = () => {
    setscrollX(scrl.current.scrollLeft);
    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };
  return (
    <div className="platme pb-5">
      <div className="container">
        <div className="ava mb-4">Recommended Courses</div>
      </div>
      <div className="putyty">
        <div className="man">
          {scrollX !== 0 && (
            <div className="gogo">
              <div
                className="next"
                onClick={() => slide(-300)}
                onMouseEnter={(e) => anim(e)}
                onMouseLeave={(e) => anim2(e)}
              >
                <MdArrowBackIosNew />
              </div>
            </div>
          )}
        </div>

        <div className="flex-up" ref={scrl} onScroll={scrollCheck}>
          <div className="linear">
            <div className="change">
              <div className="anita">Anita Gift</div>
              <div className="ux">UX Design 101</div>
              <div className="hour">2hr 30mins</div>
            </div>
          </div>
          <div className="linear2">
            <div className="change">
              <div className="anita">Anita Gift</div>
              <div className="ux">UX Design 101</div>
              <div className="hour">2hr 30mins</div>
            </div>
          </div>
          <div className="linear">
            <div className="change">
              <div className="anita">Anita Gift</div>
              <div className="ux">UX Design 101</div>
              <div className="hour">2hr 30mins</div>
            </div>
          </div>
          <div className="linear2">
            <div className="change">
              <div className="anita">Anita Gift</div>
              <div className="ux">UX Design 101</div>
              <div className="hour">2hr 30mins</div>
            </div>
          </div>
          <div className="linear">
            <div className="change">
              <div className="anita">Anita Gift</div>
              <div className="ux">UX Design 101</div>
              <div className="hour">2hr 30mins</div>
            </div>
          </div>
          <div className="linear2">
            <div className="change">
              <div className="anita">Anita Gift</div>
              <div className="ux">UX Design 101</div>
              <div className="hour">2hr 30mins</div>
            </div>
          </div>
          <div className="linear">
            <div className="change">
              <div className="anita">Anita Gift</div>
              <div className="ux">UX Design 101</div>
              <div className="hour">2hr 30mins</div>
            </div>
          </div>
        </div>

        <div className="man">
          {!scrolEnd && (
            <div className="gogo2">
              <div
                className="next2"
                onClick={() => slide(+300)}
                onMouseEnter={(e) => anim(e)}
                onMouseLeave={(e) => anim2(e)}
              >
                <MdArrowForwardIos />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="d-flex justify-content-center mt-5">
        <button className="view">VIEW MORE</button>
      </div>
    </div>
  );
};

export default RecommendedCourse;
