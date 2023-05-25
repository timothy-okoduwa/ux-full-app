import React from 'react'
import './LandingPage.css';
import Hero from '../../components/Hero';
import Trending from '../../components/Trending';
import AvailableCourses from '../../components/AvailableCourses';
import ComingSoon from '../../components/ComingSoon';
import Reasons from '../../components/Reasons';
import Explore from '../../components/Explore';
import Suggestions from '../../components/Suggestions';
import Listen from '../../components/Listen';
const LandingPage = () => {
  return (
    <div>
        <Hero/>
        <Trending/>
        <AvailableCourses/>
        <ComingSoon/>
      <Reasons/>
      <Explore/>
      <Suggestions/>
      <Listen/>
    </div>
  )
}

export default LandingPage