import React from "react";
import OneItem from "../OneItem";

const ItemWrapper = ({ el }) => {
  return (
    <div className="col-12 col-sm-4 col-md-3 col-lg-2 col-xl-2 col-xxl-2">
      <OneItem item={el} />
    </div>
  );
};

export default ItemWrapper;
