import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../../contexts/ThemeContext";
import CustomNavBar from "../../AppNavbar/CustomNavBar";
import GenericList from "../../GenericList";
import Footer from "../../Footer/Footer";
import CollectionWrapper from "../../Collection/CollectionList/index.js";
import ItemWrapper from "../../Item/ItemList/index.js";
import ErrorBoundary from "../../HOC/ErrorBoundary";
import { DataContext } from "../../../contexts/DataContext.js";
import useDataFetching from "../../../hooks/useDataFetching.js";
import CollectionList from "../../Collection/CollectionList/index.js";
import ItemList from "../../Item/ItemList/index.js";

const MainPage = () => {
  const { data, setData } = useContext(DataContext);
  const pageParamsCollection = {
    apiFunction: "getCollections",
    limit: 5,
    userPage: false,
    setData,
    isCollection: true,
  };
  const pageParamsItem = {
    apiFunction: "getItems",
    limit: 12,
    userPage: false,
    setData,
    isItem: true,
  };
  useDataFetching(pageParamsCollection);
  useDataFetching(pageParamsItem);

  const { t, i18n } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const themeClass =
    theme === "light"
      ? "bg-light text-dark d-flex flex-column min-vh-100"
      : "bg-dark text-whited-flex flex-column min-vh-100";

  return (
    <div className={themeClass}>
      <ErrorBoundary componentName="CustomNavBar">
        <CustomNavBar />
      </ErrorBoundary>

      <div className="flex-grow-1">
        <ErrorBoundary componentName="GenericList">
          <h1 className="text-center m-3">Largest collections</h1>
          <CollectionList data={data.collections.list} />
          <h1 className="text-center m-3">Last items</h1>
          <ItemList data={data.items.list} />
        </ErrorBoundary>
        <ErrorBoundary componentName="GenericList"></ErrorBoundary>
      </div>

      <Footer />
    </div>
  );
};

export default MainPage;
