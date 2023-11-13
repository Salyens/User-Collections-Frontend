import Dropdown from "react-bootstrap/Dropdown";
import { useTranslation } from "react-i18next";
import { US, RU } from "country-flag-icons/react/3x2";
import { useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";

const AppLanguage = ({ currentLang, onSetCurrentLang }) => {
  const { i18n } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const themeClass =
  theme === "light"
    ? "bg-primary text-white border-0"
    : "bg-dark text-white border-0";

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    onSetCurrentLang(lng);
    localStorage.setItem("currentLanguage", lng);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle className={themeClass} variant="primary" id="dropdown-basic">
        {currentLang}
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ minWidth: "auto" }}>
        <Dropdown.Item className="d-flex" onClick={() => changeLanguage("en")}>
          <US title="English" className="w-100" />
        </Dropdown.Item>
        <Dropdown.Item className="d-flex" onClick={() => changeLanguage("ru")}>
          <RU title="Русский" className="w-100" />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default AppLanguage;
