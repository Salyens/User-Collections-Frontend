import React, { useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import CustomNavBar from "../../AppNavbar/CustomNavBar";
import GenericList from "../../GenericList";
import Footer from "../../Footer/Footer";
import CollectionWrapper from "../../Collection/CollectionWrapper.js";

const CollectionsPage = ({ currentLang, onSetCurrentLang }) => {
  const { t, i18n } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const themeClass =
    theme === "light"
      ? "bg-light text-dark d-flex flex-column min-vh-100"
      : "bg-dark text-white d-flex flex-column min-vh-100";

  return (
    <div className={themeClass}>
      <CustomNavBar
        currentLang={currentLang}
        onSetCurrentLang={onSetCurrentLang}
      />
      <div className="flex-grow-1">
        <GenericList
          getAll={true}
          type="collections"
          header={t("All-collections-header")}
          limit="10"
          Wrapper={CollectionWrapper}
          apiFunction="getCollections"
          userPage={false}
          button="outline-success"
        />
      </div>

      <Footer />
    </div>
  );
};

export default CollectionsPage;
