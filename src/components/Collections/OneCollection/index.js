import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./onecollection.css"

const OneCollection = ({ name, description }) => {
  return (

      <Card >
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body className="wrapper-collection">
          <Card.Title>{name}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Button variant="success">Open</Button>
        </Card.Body>
      </Card>

  );
};

export default OneCollection;
