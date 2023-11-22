import React from "react";
import { Form } from "react-bootstrap";
import { useTable } from "react-table";

const TableHeader = ({ items, tableInstance, isChecked, onSetIsChecked }) => {
  const handleFillAll = (e) => {
    if (e.target.checked) {
      onSetIsChecked(items.map((item) => item._id));
    } else {
      onSetIsChecked([]);
    }
  };

  return (
    <thead>
      {tableInstance.headerGroups.map((headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          <th>
            <Form.Check
              type="checkbox"
              aria-label="select all"
              checked={isChecked.length === items.length && items.length > 0}
              onChange={handleFillAll}
            />
          </th>
          <th>Edit</th>
          {headerGroup.headers.map((column) => (
            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
              {column.render("Header")}
              <span className="ms-1">
                {column.isSorted ? (
                  column.isSortedDesc ? (
                    <i className="bi bi-sort-down"></i>
                  ) : (
                    <i className="bi bi-sort-up"></i>
                  )
                ) : (
                  ""
                )}
              </span>
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

export default TableHeader;
