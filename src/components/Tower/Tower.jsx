import React from 'react';
import "./tower.css"
<link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'></link>

export default function Tower({name , children, onload}){
  

  return (
    <div className="tower-background" onLoad={onload}>
      <h1>Torre {name}</h1>
      <div className="apartments">
        {children}
      </div>
    </div>
  );
}