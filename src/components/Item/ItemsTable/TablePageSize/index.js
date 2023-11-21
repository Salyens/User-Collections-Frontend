import React from "react";
import { Dropdown } from "react-bootstrap";

const TablePageSize = ({setPageSize}) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
        Page size
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {[5, 10, 25, 50, 100].map((menuItem) => (
          <Dropdown.Item key={menuItem} onClick={() => setPageSize(menuItem)}>
            {menuItem}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default TablePageSize;
