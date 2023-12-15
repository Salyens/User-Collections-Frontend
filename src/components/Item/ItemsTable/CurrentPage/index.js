import React from "react";
import { useTranslation } from "react-i18next";

const CurrentPage = ({ pageIndex, pageOptions }) => {
  const { t } = useTranslation();
  return <h3 className="fs-5 mt-3">{t("Page")}: {`${pageIndex + 1} ${t("Of")} ${pageOptions.length}`} </h3>;
};

export default CurrentPage;
