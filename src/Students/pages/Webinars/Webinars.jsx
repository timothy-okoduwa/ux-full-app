import React from 'react';
import './Webinars.css';
import WebinarHead from '../../components/WebinarHead';
import UpcomingWebinar from '../../components/UpcomingWebinar';
import Suggestions from '../../components/Suggestions';
import PastWebinars from '../../components/PastWebinars';
const Webinars = () => {
  return (
    <div>
      <WebinarHead />
      <UpcomingWebinar />
      <PastWebinars />
      <Suggestions />
    </div>
  );
};

export default Webinars;
