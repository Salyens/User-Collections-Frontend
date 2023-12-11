import { useContext } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../../contexts/ThemeContext";

const Profile = ({ onSetUser }) => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);

  const handleLogOut = () => {
    localStorage.clear();
    onSetUser({});
  };

  return (
    <div className="d-flex justify-content-end align-items-center">
      <div className="me-2">
        <Link className={`${theme} btn border-0 p-1`} to={"/user-collections"}>
          {t("User-page")}
        </Link>
      </div>
      <Button
        className={`${theme} bg-primary border-0 p-1`}
        onClick={() => handleLogOut()}
      >
        {t("Logout")}
      </Button>
    </div>
  );
};

export default Profile;
