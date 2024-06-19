import React from "react";
import "./modalerror.css";
import { IoMdClose } from "react-icons/io";
export default function ModalError({ children, isOpen, onClose, setOpenModal }) {
  if (isOpen === false) {
    return null;
  }
  return (
    <div className="background-modal-error" onClick={setOpenModal}>      
      <div className="modalContainer">
        <div className="close" ><IoMdClose onClick={setOpenModal} style={{'cursor' : 'pointer'}}/></div>
        <div className="content">
        {children}
        </div>
        </div>
    </div>
  );
}
