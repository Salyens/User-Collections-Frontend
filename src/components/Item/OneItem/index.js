import Card from "react-bootstrap/Card";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { Link } from "react-router-dom";
import "./oneitem.css";

const OneItem = ({ item }) => {
  const {name, collectionName, user:{name:userName}} = item

  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const themeClass =
    theme === "light"
      ? "bg-light text-dark"
      : "bg-dark text-white border-white";

  return (
    <Card className={themeClass}>
      <Card.Body className="d-flex flex-column justify-content-between fs-6">
        <Card.Title className="truncate">{name}</Card.Title>
        <Card.Text className="truncate">{collectionName}</Card.Text>
        <Card.Text className="truncate">{userName} </Card.Text>
        <Link
          to={`/items/${name}`}
          className="d-flex justify-content-center btn btn-primary"
        >
          {t("Open-button")}
        </Link>
      </Card.Body>
    </Card>
  );
};

export default OneItem;
