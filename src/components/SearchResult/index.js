import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../contexts/DataContext";
import useDataFetching from "../../hooks/useDataFetching";
import ItemList from "../Item/ItemList";
import CustomPagination from "../CustomPagination";
import { Spinner } from "react-bootstrap";
import renderErrors from "../../helpers/renderErrors";
import { useTranslation } from "react-i18next";

const SearchResult = () => {
  const { searchInput } = useContext(DataContext);
  const [foundItems, setFoundItems] = useState({
    data: [],
    total: 0,
    isLoading: true,
  });
  const { t } = useTranslation();
  const [error, setError] = useState("");
  const pageParams = {
    apiFunction: "getItems",
    limit: 12,
    userPage: false,
    setData: setFoundItems,
    setError,
    searchText: searchInput,
  };
  const { page, setPage } = useDataFetching(pageParams);

  return (
    <div className="d-flex justify-content-center flex-grow-1 mt-1">
      {foundItems.isLoading ? (
        <Spinner className="mt-5" animation="border" size="lg" />
      ) : (
        <div className="flex-grow-1 text-center">
          {error && <div>{renderErrors(error)}</div>}
          {foundItems.data.length && !foundItems.isLoading > 0 ? (
            <>
              <h3 className="mb-3">{t("Found Items")}:</h3>
              <ItemList items={foundItems} />
              <CustomPagination
                page={page}
                limit={pageParams.limit}
                total={foundItems.total}
                onSetPage={setPage}
              />
            </>
          ) : (
            <h2 className="mt-5">{t("Item is not found")}</h2>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResult;
