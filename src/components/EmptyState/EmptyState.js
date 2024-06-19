import "./style.css";
import empty from "../../assets/no_data.svg";

import React from "react";

export default function EmptyState({ text }) {
  return (
    <div className="background">
      <img src={empty}></img>
      <h2>Oops!</h2>
      <span>{text}</span>
    </div>
  );
}
