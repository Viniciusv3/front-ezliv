import "./reservation.css"
import Button from "components/Button/Button"
<link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'></link>


export default function Reservation(props) {    
    return (
        <div className='reservation-container'>
            <div className='reservation-title'>
                <p>{props.commonAreaName}</p>
            </div>
            <div className='reservation-date'>
                <p>Dia: {props.day}</p>
                <p>Horário: {props.time1} até {props.time2}</p>
            </div>
            <div className='reservation-buttons'>
                <Button className={"btnRegistration"} click={props.edit} >Editar</Button>
                <Button className={"btnRegistration"} click={props.delete} >Cancelar</Button>
            </div>
        </div>

    )
}