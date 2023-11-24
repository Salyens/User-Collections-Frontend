import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../../contexts/ThemeContext";
import CustomNavBar from "../../AppNavbar/CustomNavBar";
import GenericList from "../../GenericList";
import Footer from "../../Footer/Footer";
import CollectionWrapper from "../../Collection/CollectionWrapper/index.js";
import ItemWrapper from "../../Item/ItemWrapper/index.js";
import ErrorBoundary from "../../HOC/ErrorBoundary";

const MainPage = ({ currentLang, onSetCurrentLang }) => {
  const { t, i18n } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const themeClass =
    theme === "light" ? "bg-light text-dark" : "bg-dark text-white";

  return (
    <div className={themeClass}>
      <ErrorBoundary componentName="CustomNavBar">
        <CustomNavBar
          currentLang={currentLang}
          onSetCurrentLang={onSetCurrentLang}
        />
      </ErrorBoundary>
      <ErrorBoundary componentName="GenericList">
        <GenericList
          type="collections"
          header={t("Home-collection-header")}
          limit="5"
          Wrapper={CollectionWrapper}
          apiFunction="getCollections"
          button="outline-success"
        />
      </ErrorBoundary>
      <ErrorBoundary componentName="GenericList">
        <GenericList
          getAll={false}
          type="items"
          header={t("Home-items-header")}
          limit="12"
          Wrapper={ItemWrapper}
          apiFunction="getItems"
          button="outline-primary"
        />
      </ErrorBoundary>

      <Footer />
    </div>
  );
};

export default MainPage;
