import { useContext } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { UserContext } from "../../../contexts/UserContext";

const Profile = ({ onSetUser }) => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  const handleLogOut = () => {
    localStorage.clear();
    onSetUser({});
  };

  const transferTo = () => {
    if (user.role === "user") return "/user-collections";
    else if (user.role === "admin" || user.role === "root") return "/adminPage";
  };

  return (
    <div className="d-flex justify-content-end align-items-center">
      <div className="me-2">
        <Link className={`${theme} btn border-0 p-1`} to={transferTo()}>
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
