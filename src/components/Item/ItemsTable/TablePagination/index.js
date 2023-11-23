import React, { useContext } from "react";
import { Pagination } from "react-bootstrap";
import { ThemeContext } from "../../../../contexts/ThemeContext";
import "./tablepagination.css";

const TablePagination = ({ tableInstance }) => {
  const {
    gotoPage,
    previousPage,
    canPreviousPage,
    pageIndex,
    nextPage,
    canNextPage,
    pageCount,
  } = tableInstance;
  const { theme } = useContext(ThemeContext);
  const themeClass = theme === "light" ? "light" : "dark";
  return (
    <Pagination className={themeClass}>
      <Pagination.First
        onClick={() => gotoPage(0)}
        disabled={!canPreviousPage}
        id={themeClass}
      />
      <Pagination.Prev
        onClick={() => previousPage()}
        disabled={!canPreviousPage}
        id={themeClass}
      />

      {[...Array(pageCount).keys()].map((pageNumber) => (
        <Pagination.Item
          key={pageNumber}
          active={pageNumber === pageIndex}
          onClick={() => gotoPage(pageNumber)}
          id={themeClass}
        >
          {pageNumber + 1}
        </Pagination.Item>
      ))}

      <Pagination.Next
        onClick={() => nextPage()}
        disabled={!canNextPage}
        id={themeClass}
      />
      <Pagination.Last
        onClick={() => gotoPage(pageCount - 1)}
        disabled={!canNextPage}
        id={themeClass}
      />
    </Pagination>
  );
};

export default TablePagination;
