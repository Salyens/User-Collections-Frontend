import Pagination from "react-bootstrap/Pagination";
import "./custompagination.css";

const CustomPagination = ({ page, limit, total, onSetPage }) => {
  const totalPages = Math.ceil(total / limit);
  if (totalPages <= 1) return null;
  const maxPagesToShow = 10;
  const halfPagesToShow = Math.floor(maxPagesToShow / 2);
  const showFirstEllipsis = page > 10;
  const showSecondEllipsis = totalPages > 10;
  let startPage = Math.max(1, page - halfPagesToShow);
  let endPage = Math.min(totalPages, page + halfPagesToShow);

  const adjustStartAndEndPages = () => {
    if (endPage - startPage < maxPagesToShow - 1) {
      page <= halfPagesToShow
        ? (endPage = Math.min(totalPages, startPage + maxPagesToShow - 1))
        : (startPage = Math.max(1, endPage - maxPagesToShow + 1));
    }
  };
  adjustStartAndEndPages();

  const createPaginationItems = () => {
    const paginationItems = [];
    for (let number = startPage; number <= endPage; number++) {
      paginationItems.push(
        <Pagination.Item
          id="transparent-background"
          key={number}
          active={number === page}
          onClick={() => onSetPage(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return paginationItems;
  };

  const handleEllipsisOnClick = (adjustValue) => {
    onSetPage((prev) => {
      prev = prev + adjustValue;
      if (prev > totalPages) prev = totalPages;
      else if (prev < 1) prev = 1;
      return prev;
    });
  };

  return (
    <div className="d-flex justify-content-center mt-4">
      <Pagination>
        <Pagination.First
          id="transparent-background"
          onClick={() => onSetPage(1)}
          disabled={page === 1}
        />
        <Pagination.Prev
          id="transparent-background"
          onClick={() => onSetPage(page - 1)}
          disabled={page === 1}
        />
        {showFirstEllipsis && (
          <Pagination.Ellipsis
            id="transparent-background"
            onClick={() => handleEllipsisOnClick(-10)}
          />
        )}
        {createPaginationItems()}
        {showSecondEllipsis && (
          <Pagination.Ellipsis
            id="transparent-background"
            onClick={() => handleEllipsisOnClick(+10)}
          />
        )}
        <Pagination.Next
          id="transparent-background"
          onClick={() => onSetPage(page + 1)}
          disabled={page === totalPages}
        />
        <Pagination.Last
          id="transparent-background"
          onClick={() => onSetPage(totalPages)}
          disabled={page === totalPages}
        />
      </Pagination>
    </div>
  );
};

export default CustomPagination;
