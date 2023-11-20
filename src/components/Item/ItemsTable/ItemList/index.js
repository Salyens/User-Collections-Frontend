import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import OneRow from "../OneItem.js";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import "datatables.net-bs5";

const ItemList = ({ collection, items }) => {
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

  const renderHeaders = () => {
    return (
      <tr>
        {allFields.map((field) => (
          <th key={field}>{field}</th>
        ))}
      </tr>
    );
  };

  return (
    <div className="me-3 ms-3">
      <Table id="myTable" striped>
        <thead>{renderHeaders()}</thead>
        <tbody>
          {items.map((item) => (
            <OneRow
              key={item._id}
              item={item}
              allFields={allFields}
              collection={collection}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ItemList;
