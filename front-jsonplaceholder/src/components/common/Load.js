import React, { useState } from "react";


export default function Load({ visible }) {

  return (
    <>
      <div className="div-load" style={{ display: visible ? "block" && "flex" : "none" }}></div>
    </>
  );
}
