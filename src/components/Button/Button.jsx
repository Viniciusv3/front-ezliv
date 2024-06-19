import "./button.css";

import React from "react";

export default function Button({ className, children, click }) {
  return (
    <button className={className} onClick={click}>
      {children}
    </button>
  );
}
