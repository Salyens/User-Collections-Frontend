import React, { useContext } from "react";
import { Form, InputGroup } from "react-bootstrap";
import "./tablefilter.css";
import { ThemeContext } from "../../../../contexts/ThemeContext";

const TableFilter = ({ filter, setFilter }) => {
  const { theme } = useContext(ThemeContext);
  const themeClass =
  theme === "light"
    ? "bg-light text-dark  "
    : "bg-dark text-white border border-light";
  return (
    <InputGroup className="mb-3 search-input">
      <InputGroup.Text className={themeClass} id="inputGroup-sizing-default">Search:</InputGroup.Text>
      <Form.Control
        aria-label="Default"
        aria-describedby="inputGroup-sizing-default"
        onChange={(e) => setFilter(e.target.value)}
        value={filter || ""}
        className={themeClass}
      />
    </InputGroup>
  );
};

export default TableFilter;
