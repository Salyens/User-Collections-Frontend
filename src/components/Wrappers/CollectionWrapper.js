import React from "react";
import OneCollection from "../Collections/OneCollection";

const CollectionWrapper = ({ collection }) => (
  <div className="col-8 col-sm-4 col-md-3 col-lg-3 col-xl-2">
    <OneCollection
      name={collection.name}
      description={collection.description}
    />
  </div>
);

export default CollectionWrapper;
