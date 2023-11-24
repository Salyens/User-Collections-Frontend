import React from "react";
import CollectionCard from "../CollectionCard";

const CollectionWrapper = ({ el, userPage, onSetData }) => {
  return (
    <div className="col-12 col-sm-5 col-md-4 col-lg-3 col-xl-2 col-xxl-2">
      <CollectionCard
        collection={el}
        userPage={userPage}
        onSetData={onSetData}
      />
    </div>
  );
};

export default CollectionWrapper;
