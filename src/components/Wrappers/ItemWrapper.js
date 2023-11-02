import React from "react";
import OneItem from "../Items/OneItem/OneItem";

const ItemWrapper = ({ item }) => (
  <div className="col-7 col-sm-4 col-md-4 col-lg-3 col-xl-2">
    <OneItem
      name={item.name}
      collection={item.collectionName}
      author={item.user.name}
    />
  </div>
);

export default ItemWrapper;
