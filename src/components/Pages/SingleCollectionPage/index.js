import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import CustomNavBar from "../../AppNavbar/CustomNavBar";
import Footer from "../../Footer/Footer";
import SingleCollection from "../../Collection/SingleCollection/index.js";
import { useParams } from "react-router-dom";
import renderErrors from "../../../helpers/renderErrors.js";
import CustomPagination from "../../CustomPagination/index.js";
import ErrorBoundary from "../../HOC/ErrorBoundary";
import ItemsTable from "../../Item/ItemsTable/ItemsTable/index.js";
import useDataFetching from "../../../hooks/useDataFetching.js";
import ItemList from "../../Item/ItemList/index.js";
import SearchResult from "../../SearchResult/index.js";
import { DataContext } from "../../../contexts/DataContext.js";

const SingleCollectionPage = ({ userPage, limit }) => {
  const { collectionName } = useParams();
  const [error, setError] = useState("");
  const { theme } = useContext(ThemeContext);
  const { searchInput } = useContext(DataContext);
  const [collection, setCollection, ] = useState({
    data: [],
    total: 0,
    isLoading: true,
  });
  const [items, setItems] = useState({ data: [], total: 0, isLoading: true });

  const pageParamsOneCollection = {
    apiFunction: "getOneCollection",
    limit: limit.default,
    userPage,
    setData: setCollection,
    setError,
    collectionName,
  };
  const pageParamsItems = {
    apiFunction: "getItems",
    limit: limit.default,
    userPage,
    setData: setItems,
    setError,
    collectionName,
  };

  useDataFetching(pageParamsOneCollection);
  const { page, setPage } = useDataFetching(pageParamsItems);

  return (
    <div className={`${theme} d-flex flex-column min-vh-100`}>
      <ErrorBoundary componentName="CustomNavBar">
        <CustomNavBar />
      </ErrorBoundary>

      {searchInput ? (
        <SearchResult />
      ) : (
        <div className="flex-grow-1">
          <ErrorBoundary componentName="SingleCollection">
            {error && collection.data.length === 0 && (
              <div>{renderErrors(error)}</div>
            )}
            <SingleCollection collection={collection} />
          </ErrorBoundary>
          {error && items.data.length === 0 && <div>{renderErrors(error)}</div>}
          {userPage ? (
            <ErrorBoundary componentName="ItemList">
              <ItemsTable
                collection={collection}
                items={items}
                setItems={setItems}
              />
            </ErrorBoundary>
          ) : (
            <>
              <ErrorBoundary componentName="CustomPagination">
                <ItemList items={items} />
              </ErrorBoundary>

              <ErrorBoundary componentName="CustomPagination">
                <CustomPagination
                  page={page}
                  limit={limit}
                  total={items.total}
                  onSetPage={setPage}
                />
              </ErrorBoundary>
            </>
          )}
        </div>
      )}

      <Footer className="mt-auto" />
    </div>
  );
};

export default SingleCollectionPage;
