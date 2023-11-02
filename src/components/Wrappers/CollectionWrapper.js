import React from "react";
import OneCollection from "../OneCollection";

const CollectionWrapper = ({ collection }) => (
  <div className="col-12 col-sm-5 col-md-4 col-lg-3 col-xl-2 col-xxl-2">
    <OneCollection
      name={collection.name}
      description={collection.description}
    />
  </div>
);

export default CollectionWrapper;

