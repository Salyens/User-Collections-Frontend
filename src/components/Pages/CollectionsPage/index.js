import React, { useContext, useState } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import CustomNavBar from "../../AppNavbar/CustomNavBar";
import Footer from "../../Footer/Footer";
import ErrorBoundary from "../../HOC/ErrorBoundary.js";
import { DataContext } from "../../../contexts/DataContext.js";
import CollectionList from "../../Collection/CollectionList/index.js";
import useDataFetching from "../../../hooks/useDataFetching.js";
import CustomPagination from "../../CustomPagination/index.js";
import renderErrors from "../../../helpers/renderErrors.js";
import SearchResult from "../../SearchResult/index.js";

const CollectionsPage = ({ userPage, limit }) => {
  const { collections, setCollections, searchInput } = useContext(DataContext);
  const [error, setError] = useState("");
  const pageParams = {
    apiFunction: "getCollections",
    limit: limit.default,
    userPage,
    setData: setCollections,
    setError,
  };
  const { page, setPage } = useDataFetching(pageParams);
  const { t, i18n } = useTranslation();
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${theme} d-flex flex-column min-vh-100`}>
      <ErrorBoundary componentName="CustomNavBar">
        <CustomNavBar />
      </ErrorBoundary>

      {searchInput ? (
        <SearchResult />
      ) : (
        <>
          <div className="flex-grow-1">
            <ErrorBoundary componentName="CollectionList">
              <h1 className="text-center m-3">All collections</h1>
              {error && <div>{renderErrors(error)}</div>}
              <CollectionList collections={collections} />
            </ErrorBoundary>
          </div>
          <CustomPagination
            page={page}
            limit={pageParams.limit}
            total={collections.total}
            onSetPage={setPage}
          />
        </>
      )}

      <Footer />
    </div>
  );
};

export default CollectionsPage;
