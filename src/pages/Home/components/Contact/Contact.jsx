import React from "react";
import './contact.css'

export default function Contact(){
    return(
        <>
        <div className="background-contact">
            <div className="container">
                <div className="title">
                    Contate-nos
                </div>
                <div className="inputs">
                    <div className="input-box">
                        <span>Nome:</span>
                        <input type="text" />
                    </div>
                    <div className="input-box">
                        <span>Email:</span>
                        <input type="email" />
                    </div>
                    <div className="input-box">
                        <span>Telefone:</span>
                        <input type="number" />
                    </div>
                    <div className="input-box">
                        <span>Mensagem:</span>
                        <textarea name="" id="textArea" cols="30" rows="10"></textarea>
                    </div>
                </div>
                <div className="action">
                    <button className="">Enviar</button>
                </div>
            </div>
        </div>
        </>
    )
}