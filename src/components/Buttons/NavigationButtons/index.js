import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const NavigationButton = ({ type, button }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSeeMoreClick = (type) => {
    navigate(`/${type}`);
  };

  return (
    <div className="d-flex justify-content-center mb-4">
      <Button variant={button} onClick={() => handleSeeMoreClick(type)}>
        {t("See more")}
      </Button>
    </div>
  );
};

export default NavigationButton;
