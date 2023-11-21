import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import "./tablefilter.css";

const TableFilter = ({ filter, setFilter }) => {
  return (
    <InputGroup className="mb-3 search-input">
      <InputGroup.Text id="inputGroup-sizing-default">Search:</InputGroup.Text>
      <Form.Control
        aria-label="Default"
        aria-describedby="inputGroup-sizing-default"
        onChange={(e) => setFilter(e.target.value)}
        value={filter || ""}
      />
    </InputGroup>
  );
};

export default TableFilter;
