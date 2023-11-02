import Button from "react-bootstrap/Button";
import myImage from './picture.jpg';

import "./onecollection.css"
import { Card } from "react-bootstrap";

const OneCollection = ({ name, description }) => {
  return (

      <Card >
        <Card.Img src={myImage}/>
        <Card.Body>
          <Card.Title className="truncate">{name}</Card.Title>
          <Card.Text className="truncate">{description}</Card.Text>
          <Button variant="success" className="d-flex justify-content-center">Open</Button>
        </Card.Body>
      </Card>

  );
};

export default OneCollection;
