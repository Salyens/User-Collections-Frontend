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
import { LangContext } from "../../../contexts/LangContext.js";
import "./userpage.css";

const UserPage = () => {
  const { data, setData } = useContext(DataContext);
  const { currentLang, setCurrentLang } = useContext(LangContext);
  const pageParams = {
    apiFunction: "getCollections",
    limit: 5,
    userPage: true,
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

  const [modalShow, setModalShow] = useState(false);
  const handleModalToggle = () => {
    setModalShow(!modalShow);
  };
  
  return (
    <div className={themeClass}>
      <ErrorBoundary componentName="CustomNavBar">
        <CustomNavBar />
      </ErrorBoundary>
      <div className="flex-grow-1 position-relative">
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
          <CollectionList data={data.collections.list} />
        </ErrorBoundary>

        <ErrorBoundary componentName="EditCreateModal">
          <CreateCollectionModal show={modalShow} onHide={handleModalToggle} />
        </ErrorBoundary>
      </div>
      <CustomPagination
        page={page}
        limit={pageParams.limit}
        total={data.collections.total}
        onSetPage={setPage}
      />

      <Footer className="mt-auto" />
    </div>
  );
};

export default UserPage;
