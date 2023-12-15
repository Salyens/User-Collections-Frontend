import React, { useContext } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { ThemeContext } from "../../../../contexts/ThemeContext";
import "./tablefilter.css";
import { useTranslation } from "react-i18next";

const TableFilter = ({ filter, setFilter }) => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  
  return (
    <InputGroup className="mb-3 search-input">
      <InputGroup.Text className={theme} id="inputGroup-sizing-default">{t("Search")}:</InputGroup.Text>
      <Form.Control
        aria-label="Default"
        aria-describedby="inputGroup-sizing-default"
        onChange={(e) => setFilter(e.target.value)}
        value={filter || ""}
        className={theme}
      />
    </InputGroup>
  );
};

export default TableFilter;
