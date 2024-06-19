import React, {useState } from "react";
import { api } from "provider/axios";
import { viaCep } from "provider/viaCep";
// import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Header from "components/Header/Header";
import logo from "../../assets/logo.svg";
import "./condominiumregister.css"


export default function CondominiumRegister(props) {

    // const navigate = useNavigate();
    const [form, setForm] = useState([]);
    const [dataCep, setDataCep] = useState([]);
    const [msgCondominium, setMsgCondominium] = useState([]);

    function getCep() {
        viaCep.get(`${form.cep}/json/`)
            .then((response) => {
                setDataCep(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function onChange(event) {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    }

    function showCep() {
        if (form.cep && form.cep != null && form.cep.length === 8) {
            getCep();
        }
    }

    function newCondominium() {
        setMsgCondominium("")
        console.log(form)
        console.log(dataCep)
        api.post(`/condominiums`, {
            email: form.email,
            name: form.name,
            cnpj: form.cnpj,
            adressDTO: {
                adress: dataCep.logradouro,
                district: dataCep.bairro,
                number: form.number,
                cep: form.cep,
                complement: form.complement
            }
        }).then((response) => {
            setMsgCondominium("Condomínio cadastrado com sucesso!")
        })
            .catch((error) => {
                setMsgCondominium("Preencha corretamente todos os campos.")
            })
    }


    return (
        <>

            <div className="registercond-background">
                <div className="header-register">
                    <Header
                        title="Condomínios"
                        page1="Condomínios"
                        link1="/condominios"></Header>
                </div>
                <div className="registercont-container">


                    <div className="register-form">
                        <div className="logo-form">
                            <img src={logo} alt="" style={{ width: '111px', height: '40px' }} />
                        </div>
                        <div className="inputs-form">
                            <div className="inputs-left">
                                <Input name={"name"} id={"input-form"} label={"Nome:"} onChange={onChange} />
                                <Input name={"cnpj"} id={"input-form"} label={"CNPJ:"} onChange={onChange} />
                                <Input type={"email"} name={"email"} id={"input-form"} label={"Email:"} onChange={onChange} />
                                <Input name={"cep"} id={"input-form"} label={"Cep:"} onChange={onChange} onblur={showCep} />
                            </div>
                            <div className="inputs-right">
                                <Input name={"adress"} id={"input-form"} label={"Endereço:"} onChange={onChange} value={dataCep.logradouro} />
                                <Input name={"district"} id={"input-form"} label={"Bairro:"} onChange={onChange} value={dataCep.bairro} />
                                <Input name={"number"} id={"input-form"} label={"Número:"} onChange={onChange} />
                                <Input name={"complement"} id={"input-form"} label={"Complemento:"} onChange={onChange} />
                            </div>
                        </div>
                        <div className="msg-error">
                            <p id="errorText">{msgCondominium}</p>
                        </div>

                        <div className="button-form">
                            <Button className={"btnHeaderHome"} click={newCondominium}>
                                <p>Cadastrar</p> </Button>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}