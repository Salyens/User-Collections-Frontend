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
  const { collections, setCollections } = useContext(DataContext);
  const pageParams = {
    apiFunction: "getCollections",
    limit: 12,
    userPage: false,
    setData:setCollections,
    isCollection: true,
  };
  const { page, setPage } = useDataFetching(pageParams);
  const { t, i18n } = useTranslation();
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${theme} d-flex flex-column min-vh-100`}>
      <ErrorBoundary componentName="CustomNavBar">
        <CustomNavBar />
      </ErrorBoundary>

      <div className="flex-grow-1">
        <ErrorBoundary componentName="CollectionList">
          <h1 className="text-center m-3">All collections</h1>
          <CollectionList collections={collections} />
        </ErrorBoundary>
      </div>
      <CustomPagination
        page={page}
        limit={pageParams.limit}
        total={collections.total}
        onSetPage={setPage}
      />
      <Footer />
    </div>
  );
};

export default CollectionsPage;
