import React, { useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import CustomNavBar from "../../AppNavbar/CustomNavBar";
import Footer from "../../Footer/Footer";
import ErrorBoundary from "../../HOC/ErrorBoundary.js";
import { DataContext } from "../../../contexts/DataContext.js";
import CollectionList from "../../Collection/CollectionList/index.js";
import useDataFetching from "../../../hooks/useDataFetching.js";
import CustomPagination from "../../CustomPagination/index.js";

const CollectionsPage = () => {
  const { data, setData } = useContext(DataContext);
  const pageParams = {
    apiFunction: "getCollections",
    limit: 12,
    userPage: false,
    setData,
    isCollection: true,
  };
  const { page, setPage } = useDataFetching(pageParams);
  const { t, i18n } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const themeClass =
    theme === "light"
      ? "bg-light text-dark d-flex flex-column min-vh-100"
      : "bg-dark text-white d-flex flex-column min-vh-100";

  return (
    <div className={themeClass}>
      <ErrorBoundary componentName="CustomNavBar">
        <CustomNavBar />
      </ErrorBoundary>

      <div className="flex-grow-1">
        <ErrorBoundary componentName="GenericList">
          <h1 className="text-center m-3">All collections</h1>
          <CollectionList data={data.collections.list} />
        </ErrorBoundary>
      </div>
      <CustomPagination
        page={page}
        limit={pageParams.limit}
        total={data.collections.total}
        onSetPage={setPage}
      />
      <Footer />
    </div>
  );
};

export default CollectionsPage;
