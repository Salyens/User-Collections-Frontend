import React, { useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { ThemeContext } from "../../../../contexts/ThemeContext";
import { UserContext } from "../../../../contexts/UserContext";
import { Link } from "react-router-dom";
import "./tablebody.css";

const TableBody = ({
  tableInstance,
  isChecked,
  onSetIsChecked,
  handleModalToggle,
  onSetOneItem,
  onSetModalEditShow,
  adminPage,
}) => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);

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
    handleModalToggle(onSetModalEditShow);
    onSetOneItem(row);
    onSetIsChecked([]);
  };
  return (
    <tbody {...tableInstance.getTableBodyProps()}>
      {tableInstance.page.map((row) => {
        tableInstance.prepareRow(row);
        return (
          <tr {...row.getRowProps()}>
            <td className={`${theme} border`}>
              {}
              <Form.Check
                type="checkbox"
                aria-label="select user"
                onChange={handleCheckboxChange(row.original._id)}
                checked={isChecked.includes(row.original._id)}
                disabled={row.original.role === "root"}
              />
            </td>
            {!adminPage && (
              <td className={`${theme} border`}>
                <Button
                  onClick={() => handleEditItem(row.original)}
                  className="me-1"
                  variant="outline-primary"
                >
                  <i className="bi bi-pencil-fill"></i>
                </Button>
              </td>
            )}

            {row.cells.map((cell) => {
              const isNameColumn = cell.column.id === "name" && !adminPage;
              return (
                <td className={`${theme} border`} {...cell.getCellProps()}>
                  {isNameColumn ? (
                    <Link className="link" to={`/items/${cell.value}`}>
                      {cell.render("Cell")}
                    </Link>
                  ) : (
                    cell.render("Cell")
                  )}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
