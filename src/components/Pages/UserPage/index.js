import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../../contexts/ThemeContext";
import CustomNavBar from "../../AppNavbar/CustomNavBar";
import GenericList from "../../GenericList";
import Footer from "../../Footer/Footer";
import CollectionWrapper from "../../Collection/CollectionWrapper/index.js";
import { Button } from "react-bootstrap";
import EditCreateModal from "../../Collection/Modals/EditCreateModal/index.js";
import ErrorBoundary from "../../HOC/ErrorBoundary";
import "./userpage.css";

const UserPage = ({ currentLang, onSetCurrentLang }) => {
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
        <CustomNavBar
          currentLang={currentLang}
          onSetCurrentLang={onSetCurrentLang}
        />
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

        <ErrorBoundary componentName="GenericList">
          <GenericList
            getAll={true}
            type="collections"
            header={t("My collections")}
            limit="20"
            Wrapper={CollectionWrapper}
            apiFunction="getCollections"
            userPage={true}
            button="outline-success"
          />
        </ErrorBoundary>

        <ErrorBoundary componentName="EditCreateModal">
          <EditCreateModal
            show={modalShow}
            onHide={handleModalToggle}
            mode={"create"}
          />
        </ErrorBoundary>
      </div>

      <Footer className="mt-auto" />
    </div>
  );
};

export default UserPage;
