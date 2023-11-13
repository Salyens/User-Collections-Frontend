import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import CollectionWrapper from "../Wrappers/CollectionWrapper";
import CustomNavBar from "../AppNavbar/CustomNavBar";
import GenericList from "../GenericList";
import Footer from "../Footer/Footer";
import ItemWrapper from "../Wrappers/ItemWrapper";
import { useTranslation } from "react-i18next";

const MainPage = ({ currentLang, onSetCurrentLang }) => {
  const { t, i18n } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const themeClass =
    theme === "light" ? "bg-light text-dark" : "bg-dark text-white";

  return (
    <div className={themeClass}>
      <CustomNavBar
        currentLang={currentLang}
        onSetCurrentLang={onSetCurrentLang}
      />
      <GenericList
        getAll={false}
        type="collections"
        header={t("Home-collection-header")}
        limit="5"
        Wrapper={CollectionWrapper}
        apiFunction="getCollections"
        button="outline-success"
      />
      <GenericList
        getAll={false}
        type="items"
        header={t("Home-items-header")}
        limit="12"
        Wrapper={ItemWrapper}
        apiFunction="getItems"
        button="outline-primary"
      />
      <Footer />
    </div>
  );
};

export default MainPage;
