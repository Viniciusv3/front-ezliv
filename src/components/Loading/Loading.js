import React from "react";
import loadImage from "../../assets/loading.gif";
import "./loading.css";
export default function Loading() {
  return (
    <div className="load">
      <img src={loadImage} className="loader"></img>;
    </div>
  );
}
