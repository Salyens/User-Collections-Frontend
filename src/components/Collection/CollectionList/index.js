import React from "react";
import CollectionCard from "../CollectionCard";
import { Spinner } from "react-bootstrap";

const CollectionList = ({ collections }) => {
  return (
    <div className="row d-flex justify-content-center align-items-stretch pb-3 me-3 ms-3 gx-2 gy-2">
      {collections.isLoading && <Spinner animation="border" size="lg" />}
      {collections.data.map((collection) => (
        <div
          key={`${collection._id}`}
          className="col-12 col-sm-5 col-md-4 col-lg-3 col-xl-2 col-xxl-2"
        >
          <CollectionCard collection={collection} />
        </div>
      ))}
    </div>
  );
};

export default CollectionList;
