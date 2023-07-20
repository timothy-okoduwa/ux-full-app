import React from 'react';

const PlayWebinarUrl = ({ course }) => {
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
    <div>
      <div className="container">
        <div className="diued">
          <div className="whayst">{course?.courseName}</div>
          <div className="uxdesigncv">UXDesign Master</div>
          <div className="liveddsa">
            Live . {getRelativeTime(course?.webinarDate)}
          </div>
        </div>

        <div className="comin">
          <div>
            <iframe
              width="100%"
              height="500"
              src={course?.videoUrl}
              style={{ borderRadius: '20px' }}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayWebinarUrl;
