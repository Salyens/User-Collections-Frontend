import React from "react";

const CurrentPage = ({ pageIndex, pageOptions }) => {
  return <h3 className="fs-5 mt-3">Page: {`${pageIndex + 1} of ${pageOptions.length}`} </h3>;
};

export default CurrentPage;
