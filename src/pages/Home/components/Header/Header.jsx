import React from "react";
import logo from "../../../../assets/logo.svg";
import "./header.css";
import Button from "components/Button/Button";

export default function Header({clickLogo, click}) {
  return (
    <header>
      <div className="container">
      <div className="image" onClick={clickLogo}>
      <img src={logo} alt="Logo EzLiv"></img>
      </div>
      <div className="go-login">
        <Button className={"btnHeaderHome"} click={click}>Login</Button>
      </div>
      </div>
    </header>
  );
}