import React from "react";
import "./boxReceived.css";

export default function BoxReceived ({title, children}){
    return(
        <>
        <div className="received-box">
            <div className="title">
                {title}
            </div>
            <div className="content">
            {children}
            </div>
        </div>
        </>
    );
}