import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const OneItem = ({ name, collection, author }) => {
  return (
    <Card className="h-100">
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title>{name}</Card.Title>
        <Card.Text>{collection}</Card.Text>
        <Card.Text>{author}</Card.Text>
        <Button variant="primary">Open</Button>
      </Card.Body>
    </Card>
  );
};

export default OneItem;
