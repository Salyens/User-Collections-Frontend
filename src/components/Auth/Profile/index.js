import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Profile = ({onSetIsLoggedIn}) => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.clear();
    onSetIsLoggedIn(false)
  }

  return (
    <div className="d-flex justify-content-end align-items-center">
      <div className="me-2">
        <Button className="text-light" onClick={() => navigate("/items")}>
          My page
        </Button>
      </div>
      <Button onClick={() => handleLogOut()}>Log out</Button>
    </div>
  );
};

export default Profile;
