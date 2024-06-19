import React from "react";
import "./input.css";

export default function Input({ type, onChange, name, placeholder, label, id , value, onblur, accept}) {
  return (
    <>
    <div className="inputBox">
      <span>{label}</span>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        required="required"
        onChange={onChange}
        name={name}
        autoComplete="on"
        value={value}
        onBlur={onblur}
        accept={accept}
      ></input>
      </div>
    </>  
  );
    
}
