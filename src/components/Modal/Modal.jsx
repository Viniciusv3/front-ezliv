import "./modal.css";
import logo from "../../assets/logoBlack.svg";
import Button from "components/Button/Button";
import { IoCloseSharp } from "react-icons/io5";


import React from "react";

export default function Modal({ isOpen, setModalOpen, children, click, nameButton }) {
  if (isOpen) {
    return (
      <div className="back">
        <div className="backCenter">
          <div className="modal-background">
            <div className="modal-close">
              <div className="icon" onClick={setModalOpen}>
            <IoCloseSharp />
            </div>
            </div>
            <div className="modal-logo">
              <img src={logo} alt="Logo ezliv" width="120px" />
            </div>
            <div className="modal-content">
              <div className="content-modal">
              {children}
              </div>
            </div>
            <div className="modal-button">
              <Button className="btnModal" click={click}>{nameButton}</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null

}