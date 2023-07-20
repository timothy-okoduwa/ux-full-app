import React, { useState, useEffect } from 'react';
import y from '../pages/Webinars/des.png';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
const AllPast = () => {
  const [comingSoonData, setComingSoonData] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    fetchComingSoonData();
  }, []);

  const fetchComingSoonData = async () => {
    try {
      const adminQuery = query(collection(db, 'Admin'));
      const adminSnapshot = await getDocs(adminQuery);

      if (!adminSnapshot.empty) {
        const allComingSoon = adminSnapshot.docs.reduce((accumulator, doc) => {
          const data = doc.data();
          const comingSoonArray = data.pastWebinar || [];
          return [...accumulator, ...comingSoonArray];
        }, []);

        setComingSoonData(allComingSoon);
      }
    } catch (error) {
      console.error('Error fetching coming soon data:', error);
    } finally {
      // setLoading(false);
    }
  };

  const getRelativeTime = (dateString) => {
    const webinarDate = new Date(dateString);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - webinarDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (daysDifference >= 365) {
      const yearsDifference = Math.floor(daysDifference / 365);
      return `${yearsDifference} Year${yearsDifference !== 1 ? 's' : ''} ago`;
    } else if (daysDifference >= 30) {
      const monthsDifference = Math.floor(daysDifference / 30);
      return `${monthsDifference} Month${
        monthsDifference !== 1 ? 's' : ''
      } ago`;
    } else if (daysDifference >= 7) {
      const weeksDifference = Math.floor(daysDifference / 7);
      return `${weeksDifference} Week${weeksDifference !== 1 ? 's' : ''} ago`;
    } else {
      return `${daysDifference} Day${daysDifference !== 1 ? 's' : ''} ago`;
    }
  };
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  const itemsPerPage = 12;
  const pageCount = Math.ceil((comingSoonData.length || 0) / itemsPerPage);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = comingSoonData?.slice(startIndex, endIndex) || [];
  return (
    <div style={{ marginTop: '200px' }}>
      <div className="container mt-5">
        <div>
          <div className="ava mb-4">Past Webinars</div>

          <div className="row mt-5">
            <>
              {currentData.map((item) => (
                <>
                  <div className="col-12 col-lg-4 mb-5" key={item.upComingId}>
                    <Link
                      to={`/PastWebinarDetails/${item.upComingId}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <div className="conf">
                        <div>
                          <img
                            src={item?.selectedWebinarBanner || y}
                            alt=""
                            className="cov"
                          />
                          <div className="mt-3">
                            <div className="what11">{item?.courseName}</div>
                            <div className="sdr">
                              Live . {getRelativeTime(item?.webinarDate)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </>
              ))}
            </>
          </div>
        </div>
      </div>
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
  );
};

export default AllPast;
