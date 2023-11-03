import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NavigationButton = ({ type, button }) => {
  const navigate = useNavigate();

  const handleSeeMoreClick = (type) => {
    navigate(`/${type}`);
  };

  return (
    <div className="d-flex justify-content-center">
      <Button variant={button} onClick={() => handleSeeMoreClick(type)}>
        {`See more ${type}`}
      </Button>
    </div>
  );
};

export default NavigationButton;
