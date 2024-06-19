import React from 'react';
import "./aptview.css";
import { IoCloseSharp } from "react-icons/io5";


export default function AptView({ isOpen, setModalOpen, apt, tower, children}) {
  if(isOpen){
    return (
      <div className="back">
        <div className="backCenter">
          <div className="aptview-background">
            <div className="modal-close">
            <div className="icon" onClick={setModalOpen}>
            <IoCloseSharp />
            </div>
            </div>
            <div className='aptview-header'>
              <p>Apartamento: {apt}</p>
              <p>Torre: {tower}</p>
            </div>
            <div className="aptview-residents">
              <div className='aptview-title'>
                <p>Moradores:</p>
              </div>
              <div className='aptview-cards'>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}


