import React, { useState } from 'react';
import './PurHist.css';
import { RiSearchLine } from 'react-icons/ri';
import FullTable from './FullTable';
import ReactPaginate from 'react-paginate';
const tableData = [
  {
    email: 'aeronicajade@gmailcom',
    courseName: 'UX Design 101 by Anita Gift',
    dateOfPurchase: '1/10/2023',
    price: '₦12,000',
  },
  {
    email: 'beronicajade@gmailcom',
    courseName: 'UX Design 101 by Anita Gift',
    dateOfPurchase: '1/10/2023',
    price: '₦12,000',
  },
  {
    email: 'ceronicajade@gmailcom',
    courseName: 'UX Design 101 by Anita Gift',
    dateOfPurchase: '1/10/2023',
    price: '₦12,000',
  },
  {
    email: 'deronicajade@gmailcom',
    courseName: 'UX Design 101 by Anita Gift',
    dateOfPurchase: '1/10/2023',
    price: '₦12,000',
  },
  {
    email: 'eeronicajade@gmailcom',
    courseName: 'UX Design 101 by Anita Gift',
    dateOfPurchase: '1/10/2023',
    price: '₦12,000',
  },
  {
    email: 'feronicajade@gmailcom',
    courseName: 'UX Design 101 by Anita Gift',
    dateOfPurchase: '1/10/2023',
    price: '₦12,000',
  },
  {
    email: 'geronicajade@gmailcom',
    courseName: 'UX Design 101 by Anita Gift',
    dateOfPurchase: '1/10/2023',
    price: '₦12,000',
  },
  {
    email: 'veronicajade@gmailcom',
    courseName: 'UX Design 101 by Anita Gift',
    dateOfPurchase: '1/10/2023',
    price: '₦12,000',
  },
  {
    email: 'heronicajade@gmailcom',
    courseName: 'UX Design 101 by Anita Gift',
    dateOfPurchase: '1/10/2023',
    price: '₦12,000',
  },
  {
    email: 'eronicajade@gmailcom',
    courseName: 'UX Design 101 by Anita Gift',
    dateOfPurchase: '1/10/2023',
    price: '₦12,000',
  },
  {
    email: 'venicajade@gmailcom',
    courseName: 'UX Design 101 by Anita Gift',
    dateOfPurchase: '1/10/2023',
    price: '₦12,000',
  },
  {
    email: 'heronicde@gmailcom',
    courseName: 'UX Design 101 by Anita Gift',
    dateOfPurchase: '1/10/2023',
    price: '₦12,000',
  },
  {
    email: 'veronicajade@gmailcom',
    courseName: 'UX Design 101 by Anita Gift',
    dateOfPurchase: '1/10/2023',
    price: '₦12,000',
  },
  {
    email: 'keronicajade@gmailcom',
    courseName: 'UX Design 101 by Anita Gift',
    dateOfPurchase: '1/10/2023',
    price: '₦12,000',
  },
  {
    email: 'meronicajade@gmailcom',
    courseName: 'UX Design 101 by Anita Gift',
    dateOfPurchase: '1/10/2023',
    price: '₦12,000',
  },
  {
    email: 'qeronicajade@gmailcom',
    courseName: 'UX Design 101 by Anita Gift',
    dateOfPurchase: '1/10/2023',
    price: '₦12,000',
  },
  {
    email: 'zeronicajade@gmailcom',
    courseName: 'UX Design 101 by Anita Gift',
    dateOfPurchase: '1/10/2023',
    price: '₦12,000',
  },
  {
    email: 'peronicajade@gmailcom',
    courseName: 'UX Design 101 by Anita Gift',
    dateOfPurchase: '1/10/2023',
    price: '₦12,000',
  },
  {
    email: 'veronicajade@gmailcom',
    courseName: 'UX Design 101 by Anita Gift',
    dateOfPurchase: '1/10/2023',
    price: '₦12,000',
  },
  {
    email: 'veronicajade@gmailcom',
    courseName: 'UX Design 101 by Anita Gift',
    dateOfPurchase: '1/10/2023',
    price: '₦12,000',
  },
  {
    email: 'veronicajade@gmailcom',
    courseName: 'UX Design 101 by Anita Gift',
    dateOfPurchase: '1/10/2023',
    price: '₦12,000',
  },
  {
    email: 'veronicajade@gmailcom',
    courseName: 'UX Design 101 by Anita Gift',
    dateOfPurchase: '1/10/2023',
    price: '₦12,000',
  },
];
const ForAll = () => {
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredData, setFilteredData] = useState(tableData);
  const handleSearch = () => {
    const filteredData = tableData.filter((item) =>
      item.email.includes(searchValue)
    );
    setFilteredData(filteredData);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const itemsPerPage = 6;
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="bgi ">
      <div className="container">
        <div className="budg">
          <div className="dashname mb-3">Purchase History</div>
          <div>
            <div className="d-flex container coll-lage">
              <div className="d-flex align-items-center">
                <div className="iconss">
                  <RiSearchLine />
                </div>
                <input
                  type="text"
                  className="search_input"
                  placeholder="Search by Email"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>

              <button className="search-button" onClick={handleSearch}>
                search
              </button>
            </div>
          </div>
        </div>
        <FullTable
          data={currentData}
          pageCount={pageCount}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ForAll;
