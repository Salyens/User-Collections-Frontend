import Button from "react-bootstrap/Button";
import myImage from "./picture.jpg";
import { Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "./onecollection.css";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

const OneCollection = ({ name, description }) => {
  const { theme } = useContext(ThemeContext);
  const themeClass =
    theme === "light"
      ? "bg-light text-dark"
      : "bg-dark text-white border-white";

  const { t } = useTranslation();
  return (
    <Card className={themeClass}>
      <Card.Img src={myImage} />
      <Card.Body>
        <Card.Title className="truncate">{name}</Card.Title>
        <Card.Text className="truncate">{description}</Card.Text>
        <Button variant="success" className="d-flex justify-content-center">
          {t("Open-button")}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default OneCollection;
