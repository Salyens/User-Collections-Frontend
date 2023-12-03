import React from "react";
import OneItem from "../OneItem";
import { Spinner } from "react-bootstrap";

const ItemList = ({ items }) => {
  
  return (
    <div className="row d-flex justify-content-center align-items-stretch pb-3 me-3 ms-3 gx-2 gy-2">
      {items.isLoading && <Spinner animation="border" size="lg" />}
      {items.data.map((item) => (
        <div
          key={item._id}
          className="col-12 col-sm-4 col-md-3 col-lg-2 col-xl-2 col-xxl-2"
        >
          <OneItem item={item} />
        </div>
      ))}
    </div>
  );
};

export default ItemList;
