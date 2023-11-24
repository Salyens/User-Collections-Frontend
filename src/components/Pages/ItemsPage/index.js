import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../../contexts/ThemeContext";
import CustomNavBar from "../../AppNavbar/CustomNavBar";
import GenericList from "../../GenericList";
import Footer from "../../Footer/Footer";
import ItemWrapper from "../../Item/ItemWrapper";
import ErrorBoundary from "../../HOC/ErrorBoundary";

const ItemsPage = ({ currentLang, onSetCurrentLang }) => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const themeClass =
    theme === "light"
      ? "bg-light text-dark d-flex flex-column min-vh-100"
      : "bg-dark text-white d-flex flex-column min-vh-100";

  return (
    <div className={themeClass}>
      <ErrorBoundary componentName="CustomNavBar">
        <CustomNavBar
          currentLang={currentLang}
          onSetCurrentLang={onSetCurrentLang}
        />
      </ErrorBoundary>

      <div className="flex-grow-1">
        <ErrorBoundary componentName="CustomNavBar">
          <GenericList
            getAll={true}
            type="items"
            header={t("All-items-header")}
            limit="12"
            Wrapper={ItemWrapper}
            apiFunction="getItems"
            button="outline-primary"
          />
        </ErrorBoundary>
      </div>
      <Footer className="mt-auto" />
    </div>
  );
};

export default ItemsPage;
