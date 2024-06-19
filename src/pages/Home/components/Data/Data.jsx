import React from "react";
import './data.css'

export default function Data({img, text}){
    return(
        <>
        <div className="background-data">
            <div className="image">
                <img src={img} alt="" />
            </div>
            <div className="text">
                {text}
            </div>
        </div>
        </>
    )
}