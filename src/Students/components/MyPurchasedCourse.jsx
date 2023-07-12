import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import o from '../components/images/opps.png';
import { CiSearch } from 'react-icons/ci';
import ReactPaginate from 'react-paginate';
const MyPurchasedCourse = ({
  user,
  searchQuery,
  filteredCourses,
  handleSearch,
  setSearchQuery,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const courses = searchQuery ? filteredCourses : user?.purchasedCourses;
  const hasCourses = courses && courses.length > 0;
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  const itemsPerPage = 12;
  const pageCount = Math.ceil(
    (user?.purchasedCourses?.length || 0) / itemsPerPage
  );

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = courses?.slice(startIndex, endIndex) || [];
  return (
    <div>
      <div className="container">
        <div className="go-back">
          <div className="row">
            <div className="col-12 col-lg-5">
              {' '}
              <div className="my-course">My Course</div>
            </div>
            <div className="col-12 col-lg-7 ">
              <div className="literally">
                <input
                  type="text"
                  className="d-shoes"
                  placeholder="Search Courses"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div
                  className="nows"
                  onClick={() => handleSearch()}
                  disabled={!searchQuery}
                >
                  <CiSearch />
                </div>
              </div>
            </div>
          </div>
        </div>
        <>
          {hasCourses ? (
            <div>
              <div className="row mt-5">
                {courses?.length === 0 ? (
                  <div className="col-12">
                    <div className="oops-message2">
                      <div className="bvhvbh">
                        <img src={o} alt="" style={{ width: '100%' }} />
                      </div>
                      <div className="mt-3"> Oops, nothing to show.</div>
                    </div>
                  </div>
                ) : (
                  currentData?.map((course) => (
                    <div className="col-12 col-lg-3 mb-5">
                      <div className="wsisisi2">
                        <div
                          className="linearr2"
                          style={{
                            backgroundImage: `url(${course?.thumbnailURL})`,
                          }}
                        >
                          <div className="change22">
                            <div className="anita">{course?.tutorName}</div>
                            <div className="ux">{course?.nameOfCourse}</div>
                            <div className="hour">{course?.Duration}</div>
                          </div>
                        </div>
                        <Link
                          to={`/start-watching/${course?.courseId}`}
                          style={{ textDecoration: 'none' }}
                        >
                          <div className="heart_flow">Continue Learning</div>
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : (
            <div className="col-12 mt-5">
              <div className="oops-message2">
                <div className="bvhvbh">
                  <img src={o} alt="" style={{ width: '100%' }} />
                </div>
                <div className="mt-3">
                  {' '}
                  Oops, nothing to show.
                  <br /> Go and buy a course and start learning!
                </div>
              </div>
            </div>
          )}
        </>
        <div className="brobernard mt-3">
          <ReactPaginate
            pageCount={pageCount}
            onPageChange={handlePageChange}
            containerClassName="pagination"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            activeClassName="active"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            previousLabel="<"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            nextLabel=">"
            disabledClassName="disabledd"
          />
        </div>
      </div>
    </div>
  );
};

export default MyPurchasedCourse;
