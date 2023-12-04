import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Profile from "../../Auth/Profile";
import ApiService from "../../../services/ApiService";
import NavButtonsList from "../NavButtonsList";
import { useTranslation } from "react-i18next";
import AppLanguage from "../AppLanguage";
import ThemeSwitcher from "../ThemeSwitcher";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { LangContext } from "../../../contexts/LangContext";
import Search from "../Search";

const CustomNavBar = () => {
  const [input, setInput] = useState("");
  const { currentLang } = useContext(LangContext);
  const { t, i18n } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { theme } = useContext(ThemeContext);

  const navButtons = [
    { endpoint: "/main-page", innerText: t("Home") },
    { endpoint: "/collections", innerText: t("Collections") },
    { endpoint: "/items", innerText: t("Items") },
  ];
  const logRegButtons = [
    { endpoint: "/login", innerText: t("Log in") },
    { endpoint: "/registration", innerText: t("Sign up") },
  ];

  const handleGetUserName = async () => {
    try {
      const result = await ApiService.getUserInfo();
      if (result.status === 200) setIsLoggedIn(true);
    } catch (error) {}
  };

  useEffect(() => {
    handleGetUserName();
  }, []);



  return (
    <Navbar className={`${theme} border-bottom bg-primary`}>
      <Container fluid className="row d-flex flex-column flex-lg-row p-0 m-0">
        <Nav className="col-12 col-lg-5 col-xl-4 col-xxl-3 flex-row justify-content-evenly justify-content-lg-between">
          <NavButtonsList buttons={navButtons} />
          <div className="d-flex flex-column flex-sm-row  justify-content-center align-items-center">
            <AppLanguage />
            <ThemeSwitcher />
          </div>
        </Nav>

<Search/>

        <div className=" col-12 col-lg-2 col-xl-2 d-flex justify-content-center justify-content-lg-end p-0 pe-1 mt-2 mt-md-0">
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
