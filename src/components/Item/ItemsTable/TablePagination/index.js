import React from "react";
import { Pagination } from "react-bootstrap";

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
  return (
    <Pagination>
      <Pagination.First
        onClick={() => gotoPage(0)}
        disabled={!canPreviousPage}
      />
      <Pagination.Prev
        onClick={() => previousPage()}
        disabled={!canPreviousPage}
      />

      {[...Array(pageCount).keys()].map((pageNumber) => (
        <Pagination.Item
          key={pageNumber}
          active={pageNumber === pageIndex}
          onClick={() => gotoPage(pageNumber)}
        >
          {pageNumber + 1}
        </Pagination.Item>
      ))}

      <Pagination.Next onClick={() => nextPage()} disabled={!canNextPage} />
      <Pagination.Last
        onClick={() => gotoPage(pageCount - 1)}
        disabled={!canNextPage}
      />
    </Pagination>
  );
};

export default TablePagination;
