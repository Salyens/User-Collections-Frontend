import { Button } from "react-bootstrap";
import OneCollection from "../OneCollection";
import useDataFetching from "../../../hooks/useDataFetching";
import CustomPagination from "../../CustomPagination";
import { useEffect } from "react";

const CollectionList = ({ getAll }) => {
  const {
    data: collections,
    page,
    setPage,
    limit,
    setLimit,
    total,
  } = useDataFetching("getCollections", getAll, 5);

  useEffect(() => {
    if (getAll) {
      setLimit(6);
    }
  }, [getAll]);

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
      {getAll ? (
        ""
      ) : (
        <div className="d-flex justify-content-center mt-3">
          <Button variant="outline-success">See more Collections</Button>
        </div>
      )}
      {getAll && (
        <CustomPagination
          page={page}
          limit={limit}
          total={total}
          onSetPage={setPage}
        />
      )}
    </>
  );
};

export default CollectionList;
