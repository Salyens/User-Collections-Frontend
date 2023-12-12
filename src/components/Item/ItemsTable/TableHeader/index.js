import React, { useContext } from "react";
import { Form } from "react-bootstrap";
import { ThemeContext } from "../../../../contexts/ThemeContext";
import { UserContext } from "../../../../contexts/UserContext";

const TableHeader = ({ items, tableInstance, isChecked, onSetIsChecked }) => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);

  const handleFillAll = (e) => {
    const nonRootUserIds = items
      .filter((item) => item.role !== user.role && item.role !== "root")
      .map((item) => item._id);
    if (nonRootUserIds.length === isChecked.length) {
      onSetIsChecked([]);
    } else {
      onSetIsChecked(nonRootUserIds); 
    }
  };

  return (
    <thead>
      {tableInstance.headerGroups.map((headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          <th className={`${theme} border`}>
            <Form.Check
              type="checkbox"
              aria-label="select all"
              checked={
                isChecked.length ===
                  items.filter((item) => item.role !== "root").length &&
                items.length > 0
              }
              onChange={handleFillAll}
            />
          </th>
          {user.role === "user" && <th className={`${theme} border`}>Edit</th>}

          {headerGroup.headers.map((column) => (
            <th
              className={`${theme} border`}
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
