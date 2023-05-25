import React from 'react'
import a from '../pages/images/avatar.png'
import {BsSpotify} from 'react-icons/bs'
const Listen = () => {
  return (
    <div className="listen">
      <div className="oh-no">
        <div className="l-up">Listen to our Podcast. Don’t miss out.</div>
        <div className="we-talk">
          We talk about everything on this platfrom. We share experiences,
          <br /> ideas and discuss about design Lifestyle.
        </div>
        <div className="mt-3 d-flex justify-content-center">
          <img src={a} alt="" className="rest" />
        </div>
        <div className='mt-4'>
          <button className='spotify'>Listen on Spotify  <BsSpotify className='sp'/></button>
        </div>
      </div>
    </div>
  );
}

export default Listen