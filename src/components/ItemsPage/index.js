import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import CustomNavBar from "../AppNavbar/CustomNavBar";
import GenericList from "../GenericList";
import Footer from "../Footer/Footer";
import ItemWrapper from "../Wrappers/ItemWrapper";
import { useTranslation } from "react-i18next";

const ItemsPage = ({ currentLang, onSetCurrentLang }) => {
  const { t } = useTranslation();
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
          type="items"
          header={t("All-items-header")}
          limit="12"
          Wrapper={ItemWrapper}
          apiFunction="getItems"
          button="outline-primary"
        />
      </div>
      <Footer className="mt-auto" />
    </div>
  );
};

export default ItemsPage;
