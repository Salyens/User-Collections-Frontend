import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NavigationButton = ({ type }) => {
  const navigate = useNavigate();

  const handleSeeMoreClick = (type) => {
    if (type === "collection") {
      navigate("/collections");
    } else {
      navigate("/items");
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <Button
        variant={type === "collection" ? "outline-success" : "outline-primary"}
        onClick={() => handleSeeMoreClick(type)}
      >
        See more {type === "collection" ? "Collections" : "Items"}
      </Button>
    </div>
  );
};

export default NavigationButton;
