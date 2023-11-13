import React from "react";
import OneCollection from "../OneCollection";

const CollectionWrapper = ({ item }) => {
  const { name, description } = item;

  return (
    <div className="col-12 col-sm-5 col-md-4 col-lg-3 col-xl-2 col-xxl-2">
      <OneCollection name={name} description={description} />
    </div>
  );
};

export default CollectionWrapper;
