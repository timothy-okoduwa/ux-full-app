import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { BsFillCircleFill, BsCalendar3, BsClock } from 'react-icons/bs';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase';
import Skeleton from '@mui/material/Skeleton';
import y from '../pages/Webinars/yng.png';
import { Link } from 'react-router-dom';
const UpcomingWebinar = () => {
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
          const comingSoonArray = data.upcomingWebinar || [];
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

  return (
    <div className="upcomingHolder">
      <div className="going">
        <div className="container">
          <div className="ava mb-4">Upcoming Webinars</div>

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
                          to={`/webinar-details/${item?.upComingId}`}
                          style={{ textDecoration: 'none' }}
                        >
                          <div>
                            <div
                              className="tiemsdd"
                              style={{
                                backgroundImage: `url(${item.selectedWebinarBanner})`,
                                borderRadius: '12px',
                              }}
                            >
                              <div className="container">
                                {/* <div className="cs">Coming Soon</div> */}
                                <div className="push-down">
                                  <div className="cname33">
                                    {item?.courseName}
                                  </div>
                                  <div className="live">
                                    {' '}
                                    <BsFillCircleFill className="circledd" />{' '}
                                    <span className="liveWeb">
                                      Live Webinar
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="container hood">
                              <div className="yemi">
                                <div className="cirue">
                                  <img
                                    src={item?.selectedTutorImage || y}
                                    alt=""
                                    className="cirue"
                                  />
                                </div>
                                <div className="left">
                                  <div className="sly">{item?.tutorName}</div>
                                  <div className="pot">
                                    {item?.hostOccupation}
                                  </div>
                                </div>
                              </div>
                              <div className="hfugy">
                                <div className="hfugy2">
                                  <BsCalendar3 className="calender" />
                                  <div className="dates">
                                    {item?.webinarDate}{' '}
                                  </div>
                                </div>
                                <div className="hfugy2">
                                  <BsClock className="calender" />
                                  <div className="dates">
                                    {item?.WebinarTime}{' '}
                                  </div>
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

export default UpcomingWebinar;
