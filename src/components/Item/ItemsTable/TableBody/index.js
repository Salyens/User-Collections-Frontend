import React from "react";
import { Form } from "react-bootstrap";

const TableBody = ({tableInstance, isChecked, onSetIsChecked}) => {
    
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
  return (
    <tbody {...tableInstance.getTableBodyProps()}>
      {tableInstance.page.map((row) => {
        tableInstance.prepareRow(row);
        return (
          <tr {...row.getRowProps()}>
            <td>
              <Form.Check
                type="checkbox"
                aria-label="select user"
                onChange={handleCheckboxChange(row.original._id)}
                checked={isChecked.includes(row.original._id)}
              />
            </td>
            {row.cells.map((cell) => (
              <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
