import React from 'react';
import LeftWatch from '../../components/LeftWatch';
import RightWatch from '../../components/RightWatch';

const StartWatching = () => {
  return (
    <div className="shy">
      <div className="">
        <div className="rgnfd">
          <LeftWatch />
          <RightWatch />
        </div>
      </div>
    </div>
  );
};

export default StartWatching;
