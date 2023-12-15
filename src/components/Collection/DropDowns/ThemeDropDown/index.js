import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import themes from "../../../../data/themes/themes.json";
import { useTranslation } from "react-i18next";

const ThemeDropdown = ({ collectionKey, onSetInput, prevValue }) => {
  const [selectedTheme, setSelectedTheme] = useState("");
  const { t } = useTranslation();
  
  useEffect(() => {
    if (themes.length > 0) {
      setSelectedTheme(prevValue);
    }
  }, []);

  const handleSelect = (eventKey) => {
    setSelectedTheme(eventKey);
    onSetInput((prev) => ({ ...prev, [collectionKey]: eventKey }));
  };

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {selectedTheme || t("Select a theme")}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {themes.map((theme, index) => (
          <Dropdown.Item key={index} eventKey={theme} required>
            {theme}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ThemeDropdown;
