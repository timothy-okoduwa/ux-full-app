import React from 'react';
import HeadAndNav from '../HeadAndNav/HeadAndNav';
import MobileNav from '../HeadAndNav/MobileNav';
import AllRSVP from './AllRSVP';
const RSVPWaitlistHolder = () => {
  return (
    <div>
      <HeadAndNav />
      <MobileNav />
      <AllRSVP />
    </div>
  );
};

export default RSVPWaitlistHolder;
