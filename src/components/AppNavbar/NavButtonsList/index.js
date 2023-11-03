import React from "react";
import GenerateNavButton from "../NavButton";

const NavButtonsList = ({ buttons }) => {
  return (
    <>
      {buttons.map((button, index) => (
        <GenerateNavButton
          key={index}
          endpoint={button.endpoint}
          innerText={button.innerText}
        />
      ))}
    </>
  );
};

export default NavButtonsList;
