import React from "react";

const ContactButtons = (props) => {
  return (
    <>
        {/* Button element with dynamic text and click event handler */}
        <button className="contact-buttons" onClick={props.onClick}>
          {props.text}
        </button>
    </>
  );
};

export default ContactButtons;
