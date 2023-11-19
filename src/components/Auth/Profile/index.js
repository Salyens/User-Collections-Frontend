import { useContext } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../../contexts/ThemeContext";

const Profile = ({ onSetIsLoggedIn }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const themeClass =
    theme === "light"
      ? "bg-primary text-white border-0 p-1"
      : "bg-dark text-white border-0 p-1";

  const handleLogOut = () => {
    localStorage.clear();
    onSetIsLoggedIn(false);
  };

  return (
    <div className="d-flex justify-content-end align-items-center">
      <div className="me-2">
        <Button className={themeClass} onClick={() => navigate("/user-collections")}>
          {t("User-page")}
        </Button>
      </div>
      <Button className={themeClass} onClick={() => handleLogOut()}>{t("Logout")}</Button>
    </div>
  );
};

export default Profile;
