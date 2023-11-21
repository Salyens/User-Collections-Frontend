import React, { useState, useEffect } from "react";
import { Button, Form, Table } from "react-bootstrap";
import OneRow from "../OneRow.js/index.js";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import "datatables.net-bs5";
import ApiService from "../../../../services/ApiService.js";

const ItemList = ({ collection, items, onSetItems }) => {
  const [isChecked, setIsChecked] = useState([]);
  const [allFields, setAllFields] = useState([]);
  const requiredFields = ["name", "tags", "createdDate"];

  useEffect(() => {
    if (items && items.length > 0) {
      const additionalFields = items[0].additionalFields
        ? Object.keys(items[0].additionalFields)
        : [];

      setAllFields(
        additionalFields.length
          ? [...requiredFields, ...additionalFields]
          : requiredFields
      );

      $(document).ready(() => {
        $("#myTable").DataTable({ scrollY: 411 });
      });
    }
  }, [items]);

  const handleFillAll = (e) => {
    if (e.target.checked) {
      setIsChecked(items.map((item) => item._id));
    } else {
      setIsChecked([]);
    }
  };

  const handleDeleteItem = async () => {
    try {
      await ApiService.deleteItems(isChecked)
      const updatedItems = items.filter((item) => !isChecked.includes(item._id));
      // Обновление состояния items с помощью переданной функции onSetItems
      onSetItems(updatedItems);
    } catch (error) {
      console.log('error: ', error);
      
    }
    console.log(isChecked);
  };

  const renderHeaders = () => {
    return (
      <tr>
        <th>
          <Form.Check
            type="checkbox"
            aria-label="select user"
            checked={isChecked.length === items.length && items.length > 0}
            onChange={handleFillAll}
          />
        </th>
        {allFields.map((field) => (
          <th key={field}>{field}</th>
        ))}
      </tr>
    );
  };

  return (
    <div className="me-3 ms-3">
      <div className="mb-1 edit-btn">
        <Button
          variant="primary"
          className="me-1"
          // onClick={handleModalToggle}
        >
          Create
        </Button>
        <Button
          className="me-1"
          variant="outline-primary"
          // onClick={handleModalToggle}
        >
          Edit <i className="bi bi-pencil-fill"></i>
        </Button>
        <Button variant="outline-danger" onClick={handleDeleteItem}>
          Delete <i className="bi bi-trash-fill"></i>
        </Button>
      </div>
      <Table id="myTable" striped>
        <thead>{renderHeaders()}</thead>
        <tbody>
          {items.map((item) => (
            <OneRow
              key={item._id}
              item={item}
              allFields={allFields}
              collection={collection}
              isChecked={isChecked}
              onSetIsChecked={setIsChecked}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ItemList;
