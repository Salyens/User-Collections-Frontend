import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../../contexts/ThemeContext";
import CustomNavBar from "../../AppNavbar/CustomNavBar";
import Footer from "../../Footer/Footer";
import { Button } from "react-bootstrap";
import ErrorBoundary from "../../HOC/ErrorBoundary";
import CreateCollectionModal from "../../Collection/Modals/CreateCollectionModal/index.js";
import { DataContext } from "../../../contexts/DataContext.js";
import useDataFetching from "../../../hooks/useDataFetching.js";
import CollectionList from "../../Collection/CollectionList/index.js";
import CustomPagination from "../../CustomPagination/index.js";
import "./userpage.css";

const UserPage = () => {
  const { collections, setCollections } = useContext(DataContext);

  const pageParams = {
    apiFunction: "getCollections",
    limit: 5,
    userPage: true,
    setData:setCollections,
    isCollection: true,
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
      <div className="flex-grow-1 position-relative">
      <h2 className="text-center m-3">My collections</h2>
        <ErrorBoundary componentName="Button">
          <Button
            variant="primary"
            className="create-btn"
            onClick={handleModalToggle}
          >
            Create
          </Button>
        </ErrorBoundary>

        <ErrorBoundary componentName="Button">
          <CollectionList collections={collections} />
        </ErrorBoundary>

        <ErrorBoundary componentName="EditCreateModal">
          <CreateCollectionModal show={modalShow} onHide={handleModalToggle} />
        </ErrorBoundary>
      </div>
      <CustomPagination
        page={page}
        limit={pageParams.limit}
        total={collections.total}
        onSetPage={setPage}
      />

      <Footer className="mt-auto" />
    </div>
  );
};

export default UserPage;
