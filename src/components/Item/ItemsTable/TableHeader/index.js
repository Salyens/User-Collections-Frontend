import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { ThemeContext } from "../../../../contexts/ThemeContext";
import { UserContext } from "../../../../contexts/UserContext";
import { useTranslation } from "react-i18next";

const TableHeader = ({
  items,
  tableInstance,
  isChecked,
  onSetIsChecked,
  adminPage,
}) => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  const { t } = useTranslation();

  const handleFillAll = (e) => {
    const nonRootUserIds = items
      .filter((item) => item.role !== user.role && item.role !== "root")
      .map((item) => item._id);
    if (nonRootUserIds.length === isChecked.length) {
      onSetIsChecked([]);
    } else {
      onSetIsChecked(nonRootUserIds);
    }
  };

  return (
    <thead>
      {tableInstance.headerGroups.map((headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          <th className={`${theme} border`}>
            <Form.Check
              type="checkbox"
              aria-label="select all"
              checked={
                isChecked.length ===
                  items.filter((item) => item.role !== "root").length &&
                items.length > 0
              }
              onChange={handleFillAll}
            />
          </th>
          {!adminPage && (
            <th className={`${theme} border`}>{t("Edit button")}</th>
          )}
          {headerGroup.headers.map((column) => (
            <th
              className={`${theme} border`}
              {...column.getHeaderProps(column.getSortByToggleProps())}
            >
              {column.render("Header")}
              <span className="ms-1">
                {column.isSortedDesc ? (
                  <i className="bi bi-sort-down"></i>
                ) : (
                  <i className="bi bi-sort-up"></i>
                )}
              </span>
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

export default TableHeader;
