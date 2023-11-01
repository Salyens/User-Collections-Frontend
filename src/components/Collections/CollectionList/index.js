import { Button } from "react-bootstrap";
import ApiService from "../../../services/ApiService";
import OneCollection from "../OneCollection";
import { useEffect, useState } from "react";

const CollectionList = ({ getAll }) => {
  const [collections, setCollections] = useState([]);

  const handleGetCollections = async () => {
    try {
      const response = await ApiService.getCollections(getAll);
      setCollections(response.data);
    } catch (e) {
      console.error("Error fetching biggest collections:", e);
    }
  };

  useEffect(() => {
    handleGetCollections();
  }, []);

  return (
    <>
      <h3 className="text-center mt-3 mb-3">Largest Collections</h3>
      <div className="row gx-2 gy-2 d-flex justify-content-center me-3 ms-3">
        {collections.map((collection, index) => (
          <div
            className="col-8 col-sm-4 col-md-3 col-lg-3 col-xl-2"
            key={index}
          >
            <OneCollection
              name={collection.name}
              description={collection.description}
            />
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center mt-3">
        <Button variant="outline-success">See more Collections</Button>
      </div>
    </>
  );
};

export default CollectionList;
