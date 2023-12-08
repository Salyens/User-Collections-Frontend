import React, { useContext, useState } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import CustomNavBar from "../../AppNavbar/CustomNavBar";
import Footer from "../../Footer/Footer";
import ErrorBoundary from "../../HOC/ErrorBoundary";
import { DataContext } from "../../../contexts/DataContext.js";
import useDataFetching from "../../../hooks/useDataFetching.js";
import CollectionList from "../../Collection/CollectionList/index.js";
import ItemList from "../../Item/ItemList/index.js";
import renderErrors from "../../../helpers/renderErrors.js";
import SearchResult from "../../SearchResult/index.js";

const MainPage = ({ userPage, limit }) => {
  const { collections, setCollections, items, setItems, searchInput } =
    useContext(DataContext);
  const [error, setError] = useState("");

  const pageParamsCollection = {
    apiFunction: "getCollections",
    limit: limit.short,
    userPage,
    setData: setCollections,
    setError,
  };
  const pageParamsItem = {
    apiFunction: "getItems",
    limit: limit.default,
    userPage,
    setData: setItems,
    setError,
  };
  useDataFetching(pageParamsCollection);
  useDataFetching(pageParamsItem);
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${theme} d-flex flex-column min-vh-100`}>
      <ErrorBoundary componentName="CustomNavBar">
        <CustomNavBar />
      </ErrorBoundary>
      {searchInput ? (
        <SearchResult />
      ) : (
        <div className="flex-grow-1">
          <ErrorBoundary componentName="CollectionList">
            <h1 className="text-center m-3">Largest collections</h1>
            {error && collections.data.length === 0 && renderErrors(error)}
            <CollectionList collections={collections} userPage={userPage} />
          </ErrorBoundary>

          <ErrorBoundary componentName="GenericList">
            <h1 className="text-center m-3">Last items</h1>
            {error && items.data.length === 0 && renderErrors(error)}
            <ItemList items={items} />
          </ErrorBoundary>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default MainPage;
