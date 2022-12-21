import React from "react";

function Pagination({ nPages, currentPage, setCurrentPage }) {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);
  const nextPageHandler = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const PreviousPageHandler = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  return (
    <div>
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <button className="page-link" onClick={PreviousPageHandler}>
            {"<<"}
          </button>
        </li>

        {pageNumbers.map((pgNumber) => (
          <li
            key={pgNumber}
            className={`page-item ${currentPage === pgNumber ? "active" : ""}`}
          >
            <button
              onClick={() => setCurrentPage(pgNumber)}
              className="page-link"
              href="#"
            >
              {pgNumber}
            </button>
          </li>
        ))}

        <li className="page-item">
          <button className="page-link" onClick={nextPageHandler}>
            {">>"}
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
