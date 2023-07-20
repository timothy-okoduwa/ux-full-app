import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { BsFillCircleFill, BsCalendar3, BsClock } from 'react-icons/bs';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase';
import Skeleton from '@mui/material/Skeleton';
import y from '../pages/Webinars/des.png';
import { Link } from 'react-router-dom';
const PastWebinarSlider = () => {
  const [comingSoonData, setComingSoonData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComingSoonData();
  }, []);

  const fetchComingSoonData = async () => {
    try {
      const adminQuery = query(collection(db, 'Admin'));
      const adminSnapshot = await getDocs(adminQuery);

      if (!adminSnapshot.empty) {
        const allComingSoon = adminSnapshot.docs.reduce((accumulator, doc) => {
          const data = doc.data();
          const comingSoonArray = data.pastWebinar || [];
          return [...accumulator, ...comingSoonArray];
        }, []);

        setComingSoonData(allComingSoon);
      }
    } catch (error) {
      console.error('Error fetching coming soon data:', error);
    } finally {
      setLoading(false);
    }
  };

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
  const getRelativeTime = (dateString) => {
    const webinarDate = new Date(dateString);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - webinarDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (daysDifference >= 365) {
      const yearsDifference = Math.floor(daysDifference / 365);
      return `${yearsDifference} Year${yearsDifference !== 1 ? 's' : ''} ago`;
    } else if (daysDifference >= 30) {
      const monthsDifference = Math.floor(daysDifference / 30);
      return `${monthsDifference} Month${
        monthsDifference !== 1 ? 's' : ''
      } ago`;
    } else if (daysDifference >= 7) {
      const weeksDifference = Math.floor(daysDifference / 7);
      return `${weeksDifference} Week${weeksDifference !== 1 ? 's' : ''} ago`;
    } else {
      return `${daysDifference} Day${daysDifference !== 1 ? 's' : ''} ago`;
    }
  };

  return (
    <div className="upcomingHolder">
      <div className="going">
        <div className="container">
          <div className="ava mb-4">Watch More Past Webinars</div>

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
              {loading ? (
                <>
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width={400}
                    height={200}
                    style={{
                      borderRadius: '12px',
                      background: '#f0f0f0cc',
                      marginRight: '19px',
                    }}
                  />
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width={400}
                    height={200}
                    style={{
                      borderRadius: '12px',
                      background: '#f0f0f0cc',
                      marginRight: '19px',
                    }}
                  />
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width={400}
                    height={200}
                    style={{
                      borderRadius: '12px',
                      background: '#f0f0f0cc',
                      marginRight: '19px',
                    }}
                  />
                </>
              ) : (
                <>
                  {comingSoonData.length === 0 ? (
                    <>
                      <Skeleton
                        animation="wave"
                        variant="rectangular"
                        width={400}
                        height={200}
                        style={{
                          borderRadius: '12px',
                          background: '#f0f0f0cc',
                          marginRight: '19px',
                        }}
                      />
                      <Skeleton
                        animation="wave"
                        variant="rectangular"
                        width={400}
                        height={200}
                        style={{
                          borderRadius: '12px',
                          background: '#f0f0f0cc',
                          marginRight: '19px',
                        }}
                      />
                      <Skeleton
                        animation="wave"
                        variant="rectangular"
                        width={400}
                        height={200}
                        style={{
                          borderRadius: '12px',
                          background: '#f0f0f0cc',
                          marginRight: '19px',
                        }}
                      />
                    </>
                  ) : (
                    comingSoonData.map((item) => (
                      <>
                        <Link
                          to={`/PastWebinarDetails/${item.upComingId}`}
                          style={{ textDecoration: 'none' }}
                        >
                          <div className="conf" style={{ marginRight: '50px' }}>
                            <div>
                              <img
                                src={item?.selectedWebinarBanner || y}
                                alt=""
                                className="cov"
                              />
                              <div className="mt-3">
                                <div className="what11">{item?.courseName}</div>
                                <div className="sdr">
                                  Live . {getRelativeTime(item?.webinarDate)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </>
                    ))
                  )}
                </>
              )}
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
      </div>
    </div>
  );
};

export default PastWebinarSlider;
