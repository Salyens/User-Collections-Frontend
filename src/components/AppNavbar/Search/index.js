import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { DataContext } from "../../../contexts/DataContext";
import Form from "react-bootstrap/Form";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { ThemeContext } from "../../../contexts/ThemeContext";

const Search = () => {
  const { searchInput, setSearchInput } = useContext(DataContext);
  const [input, setInput] = useState(searchInput ? searchInput : "");
  const { t } = useTranslation();
  const location = useLocation();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    setSearchInput("");
  }, [location]);

  const handleSetSearchInput = () => {
    setSearchInput(input);
  };

  useEffect(() => {
    setInput(searchInput);
  }, [searchInput]);

  return (
    <Form className="d-flex">
      <Form.Control
        value={input}
        type="search"
        placeholder={t("Search")}
        className="  me-2"
        aria-label="Search"
        onChange={(e) => setInput(e.target.value)}
      />
      <Button
        className={theme}
        onClick={handleSetSearchInput}
        variant="outline-light"
      >
        {t("Search")}
      </Button>
    </Form>
  );
};

export default Search;
