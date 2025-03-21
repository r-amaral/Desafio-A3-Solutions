import React from "react";
import "./pagination.css";

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, i) => i + 1
  );

  return (
    <nav>
      <ul className="Pagination">
        {pageNumbers.length > 1 && (
          <li className="Page__Item">
            <button
              className="Page__Link"
              disabled={currentPage === 1}
              onClick={() => paginate(currentPage - 1)}
            >
              Prev
            </button>
          </li>
        )}
        {pageNumbers.map((number) => (
          <li key={number} className="Page__Item">
            <button
              onClick={() => paginate(number)}
              className={`Page__Link ${
                currentPage === number ? "Active" : ""
              }`}
            >
              {number}
            </button>
          </li>
        ))}
        {pageNumbers.length > 1 && (
          <li className="Page__Item">
            <button
              className="Page__Link"
              disabled={
                currentPage === pageNumbers[pageNumbers.length - 1]
              }
              onClick={() => paginate(currentPage + 1)}
            >
              Next
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
