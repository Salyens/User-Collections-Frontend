import React, { useContext } from "react";
import { Form } from "react-bootstrap";
import { useTable } from "react-table";
import { ThemeContext } from "../../../../contexts/ThemeContext";

const TableHeader = ({ items, tableInstance, isChecked, onSetIsChecked }) => {
  const { theme } = useContext(ThemeContext);
  const themeClass =
    theme === "light"
      ? "bg-light text-dark  "
      : "bg-dark text-white border border-light";

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
          <th className={themeClass}>
            <Form.Check
              type="checkbox"
              aria-label="select all"
              checked={isChecked.length === items.length && items.length > 0}
              onChange={handleFillAll}
            />
          </th>
          <th className={themeClass}>Edit</th>
          {headerGroup.headers.map((column) => (
            <th
              className={themeClass}
              {...column.getHeaderProps(column.getSortByToggleProps())}
            >
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
