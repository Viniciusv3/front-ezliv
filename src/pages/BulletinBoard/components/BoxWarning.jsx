import React from "react";
import "./boxWarning.css";
import { FiAlertTriangle } from "react-icons/fi";

export default function BoxWarning(props) {
    return (
        <>
            <div className="warningBox">
                <div className="notice">
                    <div className="header">
                        <div className="icon">
                            <FiAlertTriangle/>
                        </div>
                        <div className="title">
                            {props.title}
                        </div>
                    </div>
                    <div className="body">
                        <div className="text">
                            {props.text}
                        </div>
                    </div>
                    <div className="footer-boxWarning">
                        <div className="date">
                            {props.date}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}