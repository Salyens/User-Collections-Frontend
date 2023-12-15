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
import CreateCollectionButton from "../../Buttons/CreateCollectionButton/index.js";
import CreateCollectionModal from "../../Collection/Modals/CreateCollectionModal/index.js";
import { UserContext } from "../../../contexts/UserContext.js";

const CollectionsPage = ({ userPage, limit }) => {
  const { collections, setCollections, searchInput } = useContext(DataContext);
  const { user } = useContext(UserContext);
  const [totalFlag, setTotalFlag] = useState(false);
  const [error, setError] = useState("");
  const pageParams = {
    apiFunction: "getCollections",
    limit: limit.default,
    userPage,
    setData: setCollections,
    setError,
    totalFlag,
  };

  const { page, setPage } = useDataFetching(pageParams);
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const [modalShow, setModalShow] = useState(false);
  const handleModalToggle = () => {
    setModalShow(!modalShow);
    setTotalFlag((prev) => !prev);
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
          <div className="flex-grow-1">
            <ErrorBoundary componentName="CollectionList">
              <h1 className="text-center m-3">{t("All-collections-header")}</h1>
              {error && <div>{renderErrors(error)}</div>}

              {(user.role === "admin" || user.role === "root") && (
                <CreateCollectionButton handleModalToggle={handleModalToggle} />
              )}

              <CreateCollectionModal
                show={modalShow}
                onHide={handleModalToggle}
              />
              <CollectionList
                collections={collections}
                setTotalFlag={setTotalFlag}
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

      <Footer />
    </div>
  );
};

export default CollectionsPage;
