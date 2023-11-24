import React from "react";

const ElementsWrapper = ({ data, Wrapper, userPage, onSetData }) => {
  if (data.length === 0) {
    return <p>No data available</p>;
  }
  return (
    <div className="row d-flex justify-content-center align-items-stretch pb-3 me-3 ms-3 gx-2 gy-2">
      {data.map((el, index) => (
        <Wrapper
          el={el}
          key={`${el}-${index}`}
          userPage={userPage}
          onSetData={onSetData}
        />
      ))}
    </div>
  );
};

export default ElementsWrapper;
