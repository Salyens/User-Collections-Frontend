import React from "react";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const TablePageSize = ({setPageSize}) => {
  const { t } = useTranslation();
  return (
    <Dropdown>
      <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
        {t("Page size")}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {[5, 10, 25, 50, 100].map((menuItem) => (
          <Dropdown.Item key={menuItem} onClick={() => setPageSize(menuItem)}>
            {menuItem}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default TablePageSize;
