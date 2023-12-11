import { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Profile from "../../Auth/Profile";
import ApiService from "../../../services/ApiService";
import NavButtonsList from "../NavButtonsList";
import { useTranslation } from "react-i18next";
import AppLanguage from "../AppLanguage";
import ThemeSwitcher from "../ThemeSwitcher";
import { ThemeContext } from "../../../contexts/ThemeContext";
import Search from "../Search";
import { UserContext } from "../../../contexts/UserContext";

const CustomNavBar = () => {
  const { t, i18n } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const { user, setUser } = useContext(UserContext);

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
      const userInfo = await ApiService.getUserInfo();
      setUser(userInfo);
    } catch (error) {}
  };

  const showProfile = () => Object.keys(user).length > 0;

  useEffect(() => {
    handleGetUserName();
  }, []);

  return (
    <Navbar className={`${theme} border-bottom m-0 p-0 `}>
      <Container fluid className="row d-flex flex-column flex-lg-row p-0 m-0">
        <Nav className="col-12 col-lg-5 col-xl-4 col-xxl-3 flex-row justify-content-between ">
          <div className=" d-flex align-items-center w-75">
            <NavButtonsList buttons={navButtons} />
          </div>

          <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center">
            <AppLanguage />
            <ThemeSwitcher />
          </div>
        </Nav>
        <div className="col-12 col-lg-5 col-xl-6 col-xxl-7 mt-2 mt-sm-0 m-0 pe-4 ">
          <Search />
        </div>

        <div className=" col-12 col-lg-2 col-xl-2 d-flex justify-content-center justify-content-lg-end p-0 pe-1 mt-2 mt-md-0">
          {showProfile() ? (
            <Profile onSetUser={setUser} />
          ) : (
            <NavButtonsList buttons={logRegButtons} />
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export default CustomNavBar;
