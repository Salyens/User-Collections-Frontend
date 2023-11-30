import { Pagination } from "react-bootstrap";
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

  return (
    <Pagination>
      <Pagination.First
        onClick={() => gotoPage(0)}
        disabled={!canPreviousPage}
        className="ps-1"
        id="transparent-background"
      />
      <Pagination.Prev
        onClick={() => previousPage()}
        disabled={!canPreviousPage}
        className="ps-1"
        id="transparent-background"
      />

      {[...Array(pageCount).keys()].map((pageNumber) => (
        <Pagination.Item
          key={pageNumber}
          active={pageNumber === pageIndex}
          onClick={() => gotoPage(pageNumber)}
          className="ps-1"
          id="transparent-background"
        >
          {pageNumber + 1}
        </Pagination.Item>
      ))}

      <Pagination.Next
        onClick={() => nextPage()}
        disabled={!canNextPage}
        className="ps-1"
        id="transparent-background"
      />
      <Pagination.Last
        onClick={() => gotoPage(pageCount - 1)}
        disabled={!canNextPage}
        className="ps-1"
        id="transparent-background"
      />
    </Pagination>
  );
};

export default TablePagination;
