import React, { useContext } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { ThemeContext } from "../../../../contexts/ThemeContext";
import "./tablefilter.css";

const TableFilter = ({ filter, setFilter }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <InputGroup className="mb-3 search-input">
      <InputGroup.Text className={theme} id="inputGroup-sizing-default">Search:</InputGroup.Text>
      <Form.Control
        aria-label="Default"
        aria-describedby="inputGroup-sizing-default"
        onChange={(e) => setFilter(e.target.value)}
        value={filter || ""}
        className={theme}
      />
    </InputGroup>
  );
};

export default TableFilter;
