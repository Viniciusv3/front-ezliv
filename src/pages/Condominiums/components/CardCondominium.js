import React from "react";
import "./style.css";

export default function CardCondominium({ img, name, adress, district }) {
  return (
    <div className="card">
      <img src={img} alt="Imagem do condomínio"></img>
      <div className="condominiumName">
        <h4>{name}</h4>
        <span>{adress}</span>
        <span>{district}</span>
      </div>
    </div>
  );
}
