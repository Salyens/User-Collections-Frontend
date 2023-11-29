import Pagination from "react-bootstrap/Pagination";
import "./custompagination.css";

const CustomPagination = ({ page, limit, total, onSetPage }) => {
  const numbers = Math.ceil(total / limit);

  const items = [...Array(numbers)].map((_, index) => {
    const number = index + 1;
    return (
      <Pagination.Item
        className="ps-1"
        id="transparent-background"
        key={number}
        active={number === page}
        onClick={() => onSetPage(number)}
      >
        {number}
      </Pagination.Item>
    );
  });

  return (
    <div className="d-flex justify-content-center mt-4">
      <Pagination>{items}</Pagination>
    </div>
  );
};

export default CustomPagination;
