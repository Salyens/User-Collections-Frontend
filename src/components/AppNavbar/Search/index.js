import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { DataContext } from "../../../contexts/DataContext";
import Form from "react-bootstrap/Form";
import { useTranslation } from "react-i18next";

const Search = () => {
  const { searchInput, setSearchInput } = useContext(DataContext);
  const [input, setInput] = useState(searchInput ? searchInput : "");
  const { t, i18n } = useTranslation();

  const handleSetSearchInput = () => {
    setSearchInput(input);
  };
  useEffect(() => {
    if (!input) setSearchInput("");
  }, [input]);

  return (
    <Form className="col-12 col-lg-5 col-xl-6 col-xxl-7 d-flex mt-2 mt-sm-0 m-0 pe-4 ">
      <Form.Control
        value={input}
        type="search"
        placeholder={t("Search")}
        className="  me-2"
        aria-label="Search"
        onChange={(e) => setInput(e.target.value)}
      />
      <Button onClick={handleSetSearchInput} variant="outline-light">
        {t("Search")}
      </Button>
    </Form>
  );
};

export default Search;
