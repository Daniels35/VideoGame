import React from 'react';
import './Pagination.css';

const Pagination = ({ gamesLength, gamesPerPage, paginate, currentPage, windowWidth }) => {
  
  const generatePaginationButtons = () => {
    return [...Array(Math.ceil(gamesLength / gamesPerPage))].map((_, i) => {
      const pageNumber = i + 1;
      if (windowWidth <= 600 && (pageNumber < currentPage - 1 || pageNumber > currentPage + 1)) {
        return null;
      } 

      return (
        <button
          key={i}
          onClick={() => paginate(pageNumber)}
          className={currentPage === pageNumber ? 'active' : ''}
        >
          {pageNumber}
        </button>
      );
    });
  }

  return (
    <div className='pagination-container'>
      <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className='pagination-button-next pagination-nav'>
          {'<'}
        </button>
        {generatePaginationButtons()}
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(gamesLength / gamesPerPage)} className='pagination-button-next pagination-nav'>
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
