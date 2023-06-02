import React from 'react';
import '../pages/SignPage/Sign.css';
import p from '../pages/images/perdor.png';
import {BsCheckAll} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';
const PurchaseCourse = () => {
const navigate = useNavigate()

const move=()=>{
  navigate('/dashboard');
}
  return (
    <div className="purr">
      <div className="container">
        <div className="commp">Complete Purchase</div>
        <div className="moc-to">
          <div className="yawa">
            <div className="one">1</div>
            <div className="purc">Purchase</div>
          </div>
          <div className="shror">
            <div className="takee">
              <span className="expen"></span>
            </div>
          </div>
          <div className="yawa">
            <div className="one2">
              <BsCheckAll />
            </div>
            <div className="purc">Yours for Life !</div>
          </div>
        </div>

        <div className="dey-for">
          <div className="learn-more">
            <div className="row fluffy">
              <div className="col-12 col-lg-6 mb-5">
                <div className="mt-5 ">
                  <div className="anita">Anita Gift</div>
                  <div className="felo">UX Design 101</div>
                  <div className="price">N10,000</div>
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="gat-u">
                  <img src={p} alt="" style={{ objectFit: 'cover' }} />
                </div>
              </div>
            </div>
          </div>
          <div className="all-refresh">
            <div className="container">
              <div className="tp">Total Price</div>
              <div className="hot">NGN 10,000</div>
            </div>
          </div>
          <div className="w-100 d-flex justify-content-center">
            <button className="no-plie" onClick={move}>
              PAY WITH PAYSTACK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseCourse;
