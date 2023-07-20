import React from 'react';

import HeadAndNav from '../HeadAndNav/HeadAndNav';
import MobileNav from '../HeadAndNav/MobileNav';
import PostingWeb from './PostingWeb';
import ManageUpComing from './ManageUpComing';
import ManagePast from './ManagePast';
const Webinarr = () => {
  return (
    <div>
      <HeadAndNav />
      <MobileNav />
      <PostingWeb />

      <div style={{ marginTop: '-30px' }}>
        <ManageUpComing />
      </div>
      <div style={{ marginTop: '-30px' }}>
        <ManagePast />
      </div>
    </div>
  );
};

export default Webinarr;
