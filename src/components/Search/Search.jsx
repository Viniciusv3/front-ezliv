import React from "react";
import "./search.css";
import { FaSearch } from 'react-icons/fa';

export default function Search(onChange, name) {
    return (
        <>
        <div className="input-search">
            <div className="search-icon" onChange={onChange}>
            <FaSearch/>
            </div>
            <input type="text" placeholder="Buscar" name={name}/>
        </div>
        </>
    );
}