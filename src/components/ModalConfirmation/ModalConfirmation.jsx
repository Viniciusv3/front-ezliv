import React from "react";
import "./modalConfirmation.css"
import { IoCloseSharp } from "react-icons/io5";
import logo from "../../assets/logoBlack.svg";
import Button from "components/Button/Button";


export default function ModalConfirmation({ isOpen, setModalOpen, message, clickCancel, clickConfirm }) {
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
                <p>{message}</p>
                </div>
              </div>
              <div className="modal-button">
                <Button className="btnCancel" click={clickCancel}>Cancelar</Button>    
                <Button className="btnConfirm" click={clickConfirm}>Confirmar</Button>    
              </div>
            </div>
          </div>
        </div>
      );
    }
  
    return null

}