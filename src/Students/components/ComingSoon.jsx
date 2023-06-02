import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';

const ComingSoon = () => {
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
    <div className="going">
      <div className="container">
           <div className="ava">Coming Soon</div>

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
          <div className="tiemsd">
            <div className="container">
              <div className="cs">Coming Soon</div>
              <div className="push-down">
                <div className="cname">Joke Silver</div>
                <div className="ctitle">Illustration for UX Designer</div>
              </div>
            </div>
          </div>
          <div className="tiemsd">
            <div className="container">
              <div className="cs">Coming Soon</div>
              <div className="push-down">
                <div className="cname">Joke Silver</div>
                <div className="ctitle">Illustration for UX Designer</div>
              </div>
            </div>
          </div>
          <div className="tiemsd">
            <div className="container">
              <div className="cs">Coming Soon</div>
              <div className="push-down">
                <div className="cname">Joke Silver</div>
                <div className="ctitle">Illustration for UX Designer</div>
              </div>
            </div>
          </div>
          <div className="tiemsd">
            <div className="container">
              <div className="cs">Coming Soon</div>
              <div className="push-down">
                <div className="cname">Joke Silver</div>
                <div className="ctitle">Illustration for UX Designer</div>
              </div>
            </div>
          </div>
          <div className="tiemsd">
            <div className="container">
              <div className="cs">Coming Soon</div>
              <div className="push-down">
                <div className="cname">Joke Silver</div>
                <div className="ctitle">Illustration for UX Designer</div>
              </div>
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
      </div>
     
      <div className="d-flex justify-content-center mt-2">
        <button className="view">VIEW MORE</button>
      </div>
    </div>
  );
};

export default ComingSoon;
