import React from "react";

const ContactButtons = (props) => {
  return (
    <>
        <button className = "contact-buttons" onClick={props.onClick}>{props.text}</button>
    </>
  );
};

export default ContactButtons;