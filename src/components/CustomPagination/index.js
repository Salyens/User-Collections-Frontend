import { useContext } from "react";
import Pagination from "react-bootstrap/Pagination";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./custompagination.css";

const CustomPagination = ({ page, limit, total, onSetPage }) => {

  const numbers = Math.ceil(total / limit);
  const { theme } = useContext(ThemeContext);
  const themeClass = theme === "light" ? "light" : "dark";

  const items = [...Array(numbers)].map((_, index) => {
    const number = index + 1;
    return (
      <Pagination.Item
        id={themeClass}
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
