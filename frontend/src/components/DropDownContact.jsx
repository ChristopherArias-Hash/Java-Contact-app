import React from "react";

const DropDownContact = (props) => {
  return (
    <>
      <li className="dropdownItem">
        <a onClick={props.onClick}>{props.text}</a>
      </li>
    </>
  );
};

export default DropDownContact;