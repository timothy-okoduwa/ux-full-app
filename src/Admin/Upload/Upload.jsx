import React from 'react'
import HeadAndNav from '../HeadAndNav/HeadAndNav';
import MobileNav from '../HeadAndNav/MobileNav';
import UpAll from './UpAll';
import './Upload.css';
const Upload = () => {
  return (
    <div>
      <HeadAndNav />
      <MobileNav />
      <UpAll/>
      
    </div>
  );
}

export default Upload