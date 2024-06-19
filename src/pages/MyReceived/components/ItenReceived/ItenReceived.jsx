import React from "react";
import "./itenReceived.css";


export default function ItenReceived (props){
    return (
        <>
        <div className="iten-box">
            <div className="picture">
                <img src={props.img} alt="" />
            </div>
            <div className="infos">
                <div className="number">
                Objeto nº: {props.code}
                </div>
                <div className="date">
                Data de recebimento: {props.date}
                </div>
                <div className="status">
                Status: {props.status}
                </div>
            </div>
        </div>
        </>
    );
}