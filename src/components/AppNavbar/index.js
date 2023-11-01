import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const AppNavbar = () => {
  return (
    <Navbar className="bg-primary">
      <Container fluid className="d-flex flex-column flex-md-row align-items-start align-items-md-center">
        
        <Nav
          className="flex-row"
        >
          <Nav.Link href="#action1" className="text-light ">Home</Nav.Link>
          <Nav.Link href="#action2" className="text-light text-nowrap ">My Page</Nav.Link>
          <Nav.Link href="#action3" className="text-light ">Collections</Nav.Link>
          <Nav.Link href="#action4" className="text-light ">Items</Nav.Link>
        </Nav>

        <Form className="d-flex mt-2 mt-sm-0 w-100 ps-md-5 ">
          <Form.Control
            type="search"
            placeholder="Search"
            className=" ms-md-5 me-2"
            aria-label="Search"

          />
          <Button variant="outline-success" className="text-light">Search</Button>
        </Form>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
