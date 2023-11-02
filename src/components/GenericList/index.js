import React, { useEffect } from "react";
import useDataFetching from "../../hooks/useDataFetching";
import CustomPagination from "../CustomPagination";
import CollectionWrapper from "../Wrappers/CollectionWrapper";
import ItemWrapper from "../Wrappers/ItemWrapper";
import NavigationButton from "../Buttons/NavigationButton"

const GenericList = ({ getAll, type }) => {
  const endpoint = type === "collection" ? "getCollections" : "getItems";
  const defaultLimit = type === "collection" ? 5 : 12;

  const header = getAll
    ? type === "collection"
      ? "All Collections"
      : "All Items"
    : type === "collection"
    ? "Largest Collections"
    : "New Items";

  const { data, page, setPage, limit, setLimit, total } = useDataFetching(
    endpoint,
    getAll,
    defaultLimit
  );

  useEffect(() => {
    if (getAll) {
      setLimit(type === "collection" ? 6 : 10);
    }
  }, [getAll]);

  return (
    <>
      <h3 className="text-center mt-3 mb-3">{header}</h3>
      <div className="row d-flex justify-content-center align-items-stretch pb-3 me-3 ms-3 gx-2 gy-2">
        {data.map((item, index) =>
          type === "collection" ? (
            <CollectionWrapper collection={item} key={index} />
          ) : (
            <ItemWrapper item={item} key={index} />
          )
        )}
      </div>
      {!getAll && <NavigationButton type={type} />}


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

export default GenericList;
