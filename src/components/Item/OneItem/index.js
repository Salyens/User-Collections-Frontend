import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./oneitem.css";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";


const OneItem = ({ name, collection, author }) => {
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
        <Card.Text className="truncate">{collection}</Card.Text>
        <Card.Text className="truncate">{author} </Card.Text>
        <Button variant="primary">{t("Open-button")}</Button>
      </Card.Body>
    </Card>
  );
};

export default OneItem;
