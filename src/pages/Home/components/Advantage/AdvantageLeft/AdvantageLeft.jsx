import "./advantageLeft.css"
import React from "react"


export default function AdvantageLeft(props){
   return(
    <>
    <div className="all">
        <div className="box">
            <div className="text">
                <div className="title">
                    {props.title}
                </div>
                <div className="content">
                    {props.text}
                </div>
            </div>
            <div className="image">
                <img src={props.img} alt="" />
            </div>
        </div>
    </div>
    </>
   );
}