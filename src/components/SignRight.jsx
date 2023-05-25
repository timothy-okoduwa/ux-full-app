import React from 'react'
import b from '../pages/images/hero.png'
const SignRight = () => {
  return (
    <div>
      <div className="join">
        Join <span className='keys'>2500+</span>  students to
        <br /> learn from experts
      </div>
      <div className='mt-5'>
        <img src={b} alt="" style={{width:'100%'}}/>
      </div>
    </div>
  );
}

export default SignRight