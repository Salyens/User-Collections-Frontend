import React from "react";
import GenerateNavButton from "../NavButton";

const NavButtonsList = ({ buttons }) => {
  return (
    <div className="d-flex justify-content-between">
      {buttons.map((button, index) => (
        <GenerateNavButton
          key={index}
          endpoint={button.endpoint}
          innerText={button.innerText}
        />
      ))}
    </div>

  );
};

export default NavButtonsList;
