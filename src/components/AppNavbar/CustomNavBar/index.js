import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Profile from "../../Auth/Profile";
import ApiService from "../../../services/ApiService";
import NavButtonsList from "../NavButtonsList";

const CustomNavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navButtons = [
    { endpoint: "/main-page", innerText: "Home" },
    { endpoint: "/collections", innerText: "Collections" },
    { endpoint: "/items", innerText: "Items" },
  ];
  const logRegButtons = [
    { endpoint: "/login", innerText: "Log in" },
    { endpoint: "/registration", innerText: "Sign up" },
  ];

  const handleGetUserName = () => {
    ApiService.getUserInfo()
      .then((res) => {
        if (res.status === 200) setIsLoggedIn(true);
      })
      .catch((e) => {
        // onSetErrors([
        //   "An error occurred while getting user info. Please try again later.",
        // ]);
      });
  };

  useEffect(() => {
    handleGetUserName();
  }, [isLoggedIn]);

  return (
    <Navbar className="bg-primary">
      <Container fluid className="row d-flex flex-column flex-md-row">
        <Nav className="col-12 col-md-3 col-xl-3 col-xxl-2 flex-row justify-content-evenly justify-content-md-between">
          <NavButtonsList buttons={navButtons} />
        </Nav>

        <Form className="col-12 col-md-6 col-xxl-8 d-flex mt-2 mt-sm-0 ps-md-5  ">
          <Form.Control
            type="search"
            placeholder="Search"
            className=" ms-md-5 me-2"
            aria-label="Search"
          />
          <Button variant="outline-light">Search</Button>
        </Form>

        <div className=" col-12 col-md-3 col-xl-2 d-flex justify-content-center justify-content-md-end p-0 mt-2 mt-md-0">
          {isLoggedIn ? (
            <Profile onSetIsLoggedIn={setIsLoggedIn} />
          ) : (
            <NavButtonsList buttons={logRegButtons} />
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export default CustomNavBar;
