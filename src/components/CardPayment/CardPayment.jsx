import React from "react";
import "./cardPayment.css"
import pen from "../../assets/black-pen.svg";
import trash from "../../assets/visualizar.png"


export default function CardPayment(props) {
    
    return(
        <div className="background-card">
            <div className="photo">
            <img src={props.img} alt="" />
            </div>
            <div className="info">
                <p id="name">Status: {props.status}</p>
                <p>Valor: {props.valor}</p>
                <p>Mês Referência: {props.mes_referencia}</p>
                <p>Vencimento: {props.vencimento}</p>
            </div>
            <div className="icons">
            <img src={trash} alt="Imagem de um lixo" id="delete" style={{ width: '20px', height: '20px' }} onClick={props.view} />
            </div>
        </div>
    );
}