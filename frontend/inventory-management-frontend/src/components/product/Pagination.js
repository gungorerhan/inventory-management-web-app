import React from 'react';
import '../../styles/pagination.css';

const Pagination = ({ pageNumber, pageCount, paginate }) => {
  const pageNumbers = [];

  for (let i = 0; i < pageCount; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className={pageNumber === number ? ("activated page-item") : ("page-item") }>
            <button onClick={() => paginate(number)} className='page-link'>
              {number+1}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;