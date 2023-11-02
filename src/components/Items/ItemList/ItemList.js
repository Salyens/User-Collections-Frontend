import { useEffect } from "react";
import OneItem from "../OneItem/OneItem";
import { Button } from "react-bootstrap";
import useDataFetching from "../../../hooks/useDataFetching";
import CustomPagination from "../../CustomPagination";

const ItemList = ({ getAll }) => {
  const {
    data: items,
    page,
    setPage,
    limit,
    setLimit,
    total,
  } = useDataFetching("getItems", getAll, 6);

  useEffect(() => {
    if (getAll) {
      setLimit(20);
    }
  }, [getAll]);

  return (
    <>
      <h3 className="text-center mt-3 mb-3">New Items</h3>
      <div className="row d-flex justify-content-center align-items-stretch pb-3 pb-3 me-3 ms-3 gx-2 gy-2">
        {items.map((item, index) => (
          <div
            className="col-7 col-sm-4 col-md-4 col-lg-3 col-xl-2 "
            key={index}
          >
            <OneItem
              name={item.name}
              collection={item.collectionName}
              author={item.user.name}
            />
          </div>
        ))}
      </div>
      {getAll ? (
        ""
      ) : (
        <div className="d-flex justify-content-center">
          <Button variant="outline-primary">See more Items</Button>
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

export default ItemList;
