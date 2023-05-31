import React from 'react';
import './Dashboard2.css';
import HeadAndNav from '../HeadAndNav/HeadAndNav';
import MobileNav from '../HeadAndNav/MobileNav';
import Numbers from './Numbbs';
const Dashboard = () => {
  return (
    <div>
      <HeadAndNav />
      <MobileNav />
      <Numbers />
    </div>
  );
};

export default Dashboard;
