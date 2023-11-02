import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";

const AppNavbar = () => {
  const navigate = useNavigate();
  return (
    <Navbar className="bg-primary">
      <Container fluid className="row d-flex flex-column flex-md-row">
        <Nav className="flex-row col-12 col-md-3 col-xl-4 col-xxl-3 justify-content-evenly justify-content-md-between">
          <Nav.Link
            onClick={() => navigate("/main-page")}
            className="text-light "
          >
            Home
          </Nav.Link>
          <Nav.Link
            onClick={() => navigate("/main-page")}
            className="text-light text-nowrap "
          >
            My Page
          </Nav.Link>
          <Nav.Link
            onClick={() => navigate("/collections")}
            className="text-light "
          >
            Collections
          </Nav.Link>
          <Nav.Link onClick={() => navigate("/items")} className="text-light ">
            Items
          </Nav.Link>
        </Nav>

        <Form className="d-flex mt-2 mt-sm-0 ps-md-5 col-12 col-md-6 col-xl-6 col-xxl-7 ">
          <Form.Control
            type="search"
            placeholder="Search"
            className=" ms-md-5 me-2"
            aria-label="Search"
          />
          <Button variant="outline-light">Search</Button>
        </Form>
        <div className="d-flex justify-content-center justify-content-md-end col-12 col-md-3 p-0 mt-2 mt-md-0 col-xl-2">
          <Button variant="outline-light">Login</Button>
          <Button variant="outline-light" className="ms-3">
            Sign Up
          </Button>
        </div>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
