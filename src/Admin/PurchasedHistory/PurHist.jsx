import React from 'react'
import './PurHist.css';
import HeadAndNav from '../HeadAndNav/HeadAndNav';
import MobileNav from '../HeadAndNav/MobileNav';
import ForAll from './ForAll';
const PurHist = () => {
  return (
    <div>
      <HeadAndNav />
      <MobileNav />
      <ForAll/>
    </div>
  );
}

export default PurHist