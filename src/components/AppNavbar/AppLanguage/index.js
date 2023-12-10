import Dropdown from "react-bootstrap/Dropdown";
import { useTranslation } from "react-i18next";
import { US, RU } from "country-flag-icons/react/3x2";
import { useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { LangContext } from "../../../contexts/LangContext";

const AppLanguage = () => {
  const { currentLang, setCurrentLang } = useContext(LangContext);
  const { i18n } = useTranslation();
  const { theme } = useContext(ThemeContext);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setCurrentLang(lng);
    localStorage.setItem("currentLanguage", lng);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle className={`${theme} border-0 me-1`} variant="primary" id="dropdown-basic">
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
