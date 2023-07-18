import React from 'react';
import ReactPaginate from 'react-paginate';
import e from './cancle.svg';
const FullTable = ({ data, pageCount, onPageChange }) => {
  const showNoPurchaseMessage = data.length === 0;

  return (
    <div className="mt-5">
      <div>
        <div className="forever container">
          <div className="grew-up">
            <div className="rec">Recent Purchase</div>
            {/* <div className="seeall">See All</div> */}
          </div>
          {showNoPurchaseMessage ? (
            <div className="no-course-message mt-3 mb-5">
              <div className="w-100 d-flex justify-content-center">
                <img src={e} alt="" className="empty" />
              </div>
              <p className="mt-3" style={{ color: 'white' }}>
                Sorry, no purchase to display.
              </p>
            </div>
          ) : (
            <div className="fanta">
              <table className="table">
                <thead className="parana">
                  <tr>
                    <th scope="col" className="trtr">
                      Email
                    </th>
                    <th scope="col" className="trtr">
                      Course Name
                    </th>
                    <th scope="col" className="trtr">
                      Date of Purchase
                    </th>
                    <th scope="col" className="trtr">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr className="mt-3" key={index}>
                      <td className="trtr user-name">{item.email}</td>
                      <td className="trtr user-name">
                        {item?.nameOfCourse?.length > 23
                          ? `${item?.nameOfCourse?.slice(0, 23)}...`
                          : item?.nameOfCourse}
                      </td>
                      <td className="trtr user-name">
                        {item.datePurchased?.toDate()?.toLocaleDateString()}
                      </td>
                      <td className="trtr prices">
                        ₦ {parseFloat(item.price)?.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {showNoPurchaseMessage ? null : (
            <div className="brobernard">
              <ReactPaginate
                pageCount={pageCount}
                onPageChange={onPageChange}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default FullTable;
