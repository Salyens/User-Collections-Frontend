import React, { useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import CustomNavBar from "../../AppNavbar/CustomNavBar";
import Footer from "../../Footer/Footer";
import ErrorBoundary from "../../HOC/ErrorBoundary";
import { DataContext } from "../../../contexts/DataContext.js";
import useDataFetching from "../../../hooks/useDataFetching.js";
import CollectionList from "../../Collection/CollectionList/index.js";
import ItemList from "../../Item/ItemList/index.js";
import renderErrors from "../../../helpers/renderErrors.js";

const MainPage = () => {
  const { collections, setCollections, items, setItems } =
    useContext(DataContext);

  const pageParamsCollection = {
    apiFunction: "getCollections",
    limit: 5,
    userPage: false,
    setData: setCollections,
  };
  const pageParamsItem = {
    apiFunction: "getItems",
    limit: 12,
    userPage: false,
    setData: setItems,
  };
  const { error: errorCollection } = useDataFetching(pageParamsCollection);
  const { error: errorItem } = useDataFetching(pageParamsItem);
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${theme} d-flex flex-column min-vh-100`}>
      <ErrorBoundary componentName="CustomNavBar">
        <CustomNavBar />
      </ErrorBoundary>

      <div className="flex-grow-1">
        <ErrorBoundary componentName="CollectionList">
          <h1 className="text-center m-3">Largest collections</h1>
          {errorCollection &&
            errorCollection.length > 0 &&
            renderErrors(errorCollection)}
          <CollectionList collections={collections} />
        </ErrorBoundary>
        
        <ErrorBoundary componentName="GenericList">
          <h1 className="text-center m-3">Last items</h1>
          {errorItem && errorItem.length > 0 && renderErrors(errorItem)}
          <ItemList items={items} />
        </ErrorBoundary>
      </div>

      <Footer />
    </div>
  );
};

export default MainPage;
