import React from 'react'
import "./tracking.css"
import Button from "components/Button/Button"
<link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'></link>


export default function Reservation(props) {


    return (
        <div className='tracking-container'>
            <div className='tracking-title'>
                <p>Objeto nº: {props.trackingNumber}</p>
            </div>
            <div className='tracking-information'>
                <p>Data de recebimento: {props.date}</p>
                <p>Status: {props.status1}</p>
                <p>Apartamento: {props.apt}</p>
                <p>Bloco: {props.bloco}</p>
            </div>
            <div className='tracking-button'>
                <Button className={"btnTracking"} click={props.click}>{props.action}</Button>
            </div>
        </div>

    )
}