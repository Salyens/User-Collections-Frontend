import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./oneitem.css"

const OneItem = ({ name, collection, author }) => {
  return (
    <Card className="h-100 item">
      <Card.Body className="d-flex flex-column justify-content-between fs-6">
        <Card.Title className="truncate">{name}</Card.Title>
        <Card.Text className="truncate">{collection}</Card.Text>
        <Card.Text className="truncate">{author} </Card.Text>
        <Button variant="primary">Open</Button>
      </Card.Body>
    </Card>
  );
};

export default OneItem;
