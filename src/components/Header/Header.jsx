import "./header.css"
import logo from "../../assets/logoBlack.svg";
import { ImExit } from "react-icons/im";
import { useNavigate } from "react-router-dom";
<link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'></link>


export default function Header(props) {
    const navigate = useNavigate();

    function goHome() {
        navigate("/")
    }

    function exit(){
        sessionStorage.clear()
        localStorage.clear()
        navigate("/")
    }
    return (
        <div className="header-container">
            <div className='higher'>
                <div className='logo'>
                    <img src={logo} alt="Logo ezliv" width="150px" onClick={goHome} />
                </div>
                <div className='condominium'>
                    <p>{props.condominium}</p>
                </div>
            </div>
            <div className='bottom'>

                <div className='title-header'>
                    <p>{props.title}</p>
                </div>
                <div className='vision'>
                    <p><a href={props.link1}>{props.page1}</a></p>
                    <p><a href={props.link2}>{props.page2}</a></p>
                    <p><a href={props.link3}>{props.page3}</a></p>
                    <p><a href={props.link4}>{props.page4}</a></p>
                    <p><a href={props.link5}>{props.page5}</a></p>
                    <div className="exit" onClick={() => exit()}>
                    <ImExit />
                    </div>
                </div>
            </div>
        </div>

    )
}