import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../../contexts/ThemeContext";
import CustomNavBar from "../../AppNavbar/CustomNavBar";
import Footer from "../../Footer/Footer";
import ErrorBoundary from "../../HOC/ErrorBoundary";
import CreateCollectionModal from "../../Collection/Modals/CreateCollectionModal/index.js";
import { DataContext } from "../../../contexts/DataContext.js";
import useDataFetching from "../../../hooks/useDataFetching.js";
import CollectionList from "../../Collection/CollectionList/index.js";
import CustomPagination from "../../CustomPagination/index.js";
import renderErrors from "../../../helpers/renderErrors.js";
import SearchResult from "../../SearchResult/index.js";
import CreateCollectionButton from "../../Buttons/CreateCollectionButton/index.js";

const UserPage = ({ userPage, limit }) => {
  const { collections, setCollections, searchInput } = useContext(DataContext);
  const [error, setError] = useState("");
  const pageParams = {
    apiFunction: "getCollections",
    limit: limit.short,
    userPage,
    setData: setCollections,
    setError,
    total: collections.total,
  };
  const { page, setPage } = useDataFetching(pageParams);
  const { t, i18n } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const [modalShow, setModalShow] = useState(false);
  const handleModalToggle = () => {
    setModalShow(!modalShow);
  };

  return (
    <div className={`${theme} d-flex flex-column min-vh-100`}>
      <ErrorBoundary componentName="CustomNavBar">
        <CustomNavBar />
      </ErrorBoundary>
      {searchInput ? (
        <SearchResult />
      ) : (
        <>
          <div className="flex-grow-1 position-relative">
            <h2 className="text-center m-3">My collections</h2>
            {error && <div>{renderErrors(error)}</div>}

            <div>
              <CreateCollectionButton handleModalToggle={handleModalToggle} />
              <ErrorBoundary componentName="Button">
                <CollectionList collections={collections} userPage={userPage} />
              </ErrorBoundary>
            </div>

            <ErrorBoundary componentName="EditCreateModal">
              <CreateCollectionModal
                show={modalShow}
                onHide={handleModalToggle}
              />
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

      <Footer className="mt-auto" />
    </div>
  );
};

export default UserPage;
