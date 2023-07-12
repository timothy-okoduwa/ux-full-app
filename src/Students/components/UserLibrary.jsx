import React, { useState } from 'react';
import f from './images/gyg.png';

import { RiAwardFill } from 'react-icons/ri';
import { CgNotes } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import MyPurchasedCourse from './MyPurchasedCourse';
const UserLibrary = ({ user, handleLogOut }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);
  // const purchasedCourseRef = useRef(null);
  const handleSearch = () => {
    // Filter the purchased courses based on the search query
    const filteredCourses = user?.purchasedCourses?.filter((course) =>
      course?.nameOfCourse?.toLowerCase()?.includes(searchQuery?.toLowerCase())
    );

    // Update the filtered courses state
    setFilteredCourses(filteredCourses);
  };

  const navigate = useNavigate();
  const moce = () => {
    navigate('/setting');
  };

  return user ? (
    <>
      <div>
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-5  mt-4">
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
                      {/* Log Out */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-7"></div>
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
                          <div className="numbers">
                            0/{user?.purchasedCourses?.length || 0}
                          </div>
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
                          <div className="coursesd">Course Purchased</div>
                          <div className="numbers">
                            {user?.purchasedCourses?.length || 0}
                          </div>
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
      <div>
        <MyPurchasedCourse
          user={user}
          searchQuery={searchQuery}
          filteredCourses={filteredCourses}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
        />
      </div>
    </>
  ) : null;
};

export default UserLibrary;
