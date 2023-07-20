import React, { useState, useEffect } from 'react';
import { BsFillCircleFill, BsCalendar3, BsClock } from 'react-icons/bs';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase';

const WebinarHead = () => {
  const [comingSoonData, setComingSoonData] = useState([]);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  useEffect(() => {
    fetchComingSoonData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentItemIndex((prevIndex) =>
        prevIndex === comingSoonData.length - 1 ? 0 : prevIndex + 1
      );
    }, 1 * 60 * 1000); // 3 minutes

    return () => {
      clearTimeout(timer);
    };
  }, [currentItemIndex, comingSoonData]);

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
    }
  };

  if (comingSoonData.length === 0) {
    return null; // If no data is available, don't render anything
  }

  const currentItem = comingSoonData[currentItemIndex];

  return (
    <div>
      <div
        className="firstName"
        style={{
          backgroundImage: `url(${currentItem?.selectedWebinarBanner})`,
        }}
      >
        <div className="container">
          <div className="pt-5">
            <div className="what">{currentItem?.courseName}</div>
            <div className="mt-5">
              <div className="livebig">
                {' '}
                <BsFillCircleFill className="circledd2" />{' '}
                <span className="liveWeb2">Live Webinar</span>
              </div>
            </div>
            <div className="hfugy">
              <div className="hfugy2">
                <BsCalendar3 className="calender" />
                <div className="dates">{currentItem?.webinarDate}</div>
              </div>
              <div className="hfugy2">
                <BsClock className="calender" />
                <div className="dates">{currentItem?.WebinarTime}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebinarHead;
