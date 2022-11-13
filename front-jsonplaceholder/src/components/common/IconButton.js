import React from "react";

export default function IconButton(props) {
  let { className, ...other } = props;
  return (
    <button
      className={`btn-icon ${className ? className : ""}`}
      {...other}
    ></button>
  );
}
