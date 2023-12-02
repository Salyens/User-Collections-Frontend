import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ThemeContext } from "../../../../contexts/ThemeContext";

const TableBody = ({
  tableInstance,
  isChecked,
  onSetIsChecked,
  handleModalToggle,
  onSetOneItem,
  onSetMode,
}) => {
  const { theme } = useContext(ThemeContext);

  const handleCheckboxChange = (rowId) => (event) => {

    const checked = event.target.checked;
    onSetIsChecked((prevChecked) => {
      if (checked) {
        return prevChecked.includes(rowId)
          ? prevChecked
          : [...prevChecked, rowId];
      } else {
        return prevChecked.filter((userId) => userId !== rowId);
      }
    });
  };
  const handleEditItem = (row) => {
    handleModalToggle();
    onSetOneItem(row);
    onSetIsChecked([]);
    onSetMode("edit");
  };
  return (
    <tbody {...tableInstance.getTableBodyProps()}>
      {tableInstance.page.map((row) => {
        tableInstance.prepareRow(row);
        return (
          <tr {...row.getRowProps()}>
            <td className={`${theme} border`}>
              <Form.Check
                type="checkbox"
                aria-label="select user"
                onChange={handleCheckboxChange(row.original._id)}
                checked={isChecked.includes(row.original._id)}
              />
            </td>
            <td className={`${theme} border`}>
              <Button
                onClick={() => handleEditItem(row.original)}
                className="me-1"
                variant="outline-primary"
              >
                <i className="bi bi-pencil-fill"></i>
              </Button>
            </td>
            {row.cells.map((cell) => (
              <td className={`${theme} border`} {...cell.getCellProps()}>
                {cell.render("Cell")}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
