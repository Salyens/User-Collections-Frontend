import React from "react";
import OneItem from "../OneItem";

const ItemWrapper = ({ item }) => {
  const userName = item?.user?.name || "";

  return (
    <div className="col-12 col-sm-4 col-md-3 col-lg-2 col-xl-2 col-xxl-2">
      <OneItem
        name={item.name}
        collection={item.collectionName}
        author={userName}
      />
    </div>
  );
};


export default ItemWrapper;
