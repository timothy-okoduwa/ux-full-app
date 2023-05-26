import React from 'react';
import f from './images/gyg.png';
import { CiSearch } from 'react-icons/ci';
import { RiAwardFill } from 'react-icons/ri';
import { CgNotes } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
const UserLibrary = ({ user, handleLogOut }) => {
  const navigate = useNavigate();
  const moce = () => {
    navigate('/setting');
  };
  return user ? (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-5 mb-5">
            <div className="round">
              <div>
                <div className="fav">
                  <img src={user?.avatarURL || f} alt="" className="fav" />
                </div>
              </div>
              <div>
                <div className="welcom">Welcome, {user?.fullName}</div>
                <div className="celeb">
                  <div className="edit" onClick={moce}>
                    Edit Profile
                  </div>
                  <div className="azul" onClick={handleLogOut}>
                    Log Out
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-7">
            <div className="literally">
              <input
                type="text"
                className="d-shoes"
                placeholder="Search Courses"
              />
              <div className="nows">
                <CiSearch />
              </div>
            </div>
          </div>
        </div>
        <div className="menn">
          <div className="badgess">Badges</div>
          <div className="row">
            <div className="col-12 col-lg-6">
              <div className="somewone">
                <div className="civil">
                  <div className="container">
                    <div className="despirate">
                      <div>
                        <div className="coursesd">Course Completed</div>
                        <div className="numbers">10/20</div>
                      </div>
                      <div>
                        <RiAwardFill className="awards" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="somewone">
                <div className="civil">
                  <div className="container">
                    <div className="despirate">
                      <div>
                        <div className="coursesd">Skill Test Taken</div>
                        <div className="numbers">5</div>
                      </div>
                      <div>
                        <CgNotes className="awards" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default UserLibrary;
