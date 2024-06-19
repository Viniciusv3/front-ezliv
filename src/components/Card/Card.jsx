import React from "react";
import "./card.css"
import pen from "../../assets/black-pen.svg";
import trash from "../../assets/black-trash.svg"


export default function Card(props) {
    
    return(
        <div className="background-card">
            <div className="photo">
            <img src={props.img} alt="" />
            </div>
            <div className="info">
                <p id="name">{props.name}</p>
                <p>{props.cpf}</p>
                <p>{props.email}</p>
                <p>{props.time}</p>
            </div>
            <div className="icons">
            {
                props.edit === undefined ? null :
                <img src={pen} alt="Imagem de um lápis" id="edit" style={{ width: '20px', height: '20px' }} onClick={props.edit} />
            }
            <img src={trash} alt="Imagem de um lixo" id="delete" style={{ width: '20px', height: '20px' }} onClick={props.delete} />
            </div>
        </div>
    );
}