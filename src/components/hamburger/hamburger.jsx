import "./hamburger.scss";
import React from "react";

const Hamburger = ({ isOpen, setOpen }) => {
  return (
    <button
      className={`hamburger-icon ${isOpen ? "open" : "close"}`}
      onClick={() => setOpen(!isOpen)}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
};

export default Hamburger;
