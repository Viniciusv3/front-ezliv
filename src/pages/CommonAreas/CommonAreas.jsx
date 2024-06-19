import React, { useEffect, useState } from "react";
import "./commonAreas.css";
import Header from "components/Header/Header";
import logo from "../../assets/logoBlack.svg";
import Button from "components/Button/Button";
import CommonAreaItem from "components/CommonAreaItem/CommonAreaItem";
import { api } from "provider/axios";
import Modal from "components/Modal/Modal";
import Input from "components/Input/Input";


export default function CommonAreas({ click }) {
    const [areasData, setAreasData] = useState([]);
    const [openModalNewCommonArea, setOpenModalNewCommonArea] = useState(false);
    const [msgCommonArea, setMsgCommonArea] = useState([]);
    const [formNewCommonArea, setformNewCommonArea] = useState([]);



    useEffect(() => {
        listAllAreas();
    }, [areasData]);

    function listAllAreas() {
        let condominiumId = JSON.parse(localStorage.getItem("id"));
        api.get(`/condominiums/${condominiumId}/common-areas`)
            .then((response) => {
                setAreasData(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function onChangeNewCommonArea(event) {
        setformNewCommonArea({
            ...formNewCommonArea,
            [event.target.name]: event.target.value,
        });
    }

    function closeModalPostCommonArea() {
        setOpenModalNewCommonArea(!openModalNewCommonArea);
        setMsgCommonArea("");
        setAreasData([]);
    }

    function validationsPostCommonArea() {
        let name = formNewCommonArea.name
        let openingTime = formNewCommonArea.openingTime
        let closingTime = formNewCommonArea.closingTime
        let minReservationTime = formNewCommonArea.minReservationTime
        let maxReservationTime = formNewCommonArea.maxReservationTime
        if ((name === null || name === "" || name === undefined) || openingTime === null || closingTime === null || minReservationTime === null || maxReservationTime === null || (openingTime >= closingTime || minReservationTime > maxReservationTime)) {
            console.log(name)
            console.log(openingTime)
            console.log(closingTime)
            console.log(minReservationTime)
            console.log(maxReservationTime)
            setMsgCommonArea("Preencha corretamente os campos")
        } else {
            newCommonArea()
        }
    }

    function newCommonArea() {
        let condominiumId = JSON.parse(localStorage.getItem("id"));
        api
            .post(
                `/condominiums/${condominiumId}/common-areas`,
                {
                    name: formNewCommonArea.name,
                    openingTime: formNewCommonArea.openingTime,
                    closingTime: formNewCommonArea.closingTime,
                    maxReservationTime: formNewCommonArea.maxReservationTime,
                    minReservationTime: formNewCommonArea.minReservationTime
                }
            )
            .then((response) => {
                setMsgCommonArea("Área comum cadastrada com sucesso!");
            })
            .catch((error) => {
                console.log(error);
            });

    }

    function registeringNewCommonArea() {
        setOpenModalNewCommonArea(!openModalNewCommonArea);
    }

    return (
        <>
            <div className="commonarea-background">
                <div className="headerSindico">
                <Header
            condominium={localStorage.getItem("condominiumName")}
            title="Visão Geral"
            page1="Visão Geral"
            link1="/sindico-visao-geral"
            page2="Mural de Avisos"
            link2="/mural-de-avisos"
            page3="Áreas Comuns"
            link3="/areas-comuns"
            page4="Funcionários"
            link4="/funcionarios"
          ></Header>
                </div>
                <div className="commonarea-board">
                    <div className="common-area-box">

                        <div className="back-common">
                            <div className="backCenter-common">
                                <div className="modal-background">
                                    <div className="modal-logo">
                                        <img src={logo} alt="Logo ezliv" width="120px" />
                                    </div>
                                    <div className="modal-content">
                                        <div className="content-modal">
                                            {areasData?.map((area, index) => (
                                                <CommonAreaItem
                                                    key={area.id}
                                                    nameArea={area.name} />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="modal-button">
                                        <Button className="btnModal" click={() => registeringNewCommonArea()}>Nova</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={openModalNewCommonArea}
                setModalOpen={() => closeModalPostCommonArea()}
                click={() => validationsPostCommonArea()}
                nameButton={"Cadastrar"}
            >
                <Input
                    label={"Nome área comum:"}
                    name={"name"}
                    value={formNewCommonArea.name}
                    onChange={onChangeNewCommonArea}
                />
                <div className="times">
                    <div className="openAndClose">
                        <div className="times-group">
                            <label>Abre ás:</label>
                            <input type="time" name="openingTime" value={formNewCommonArea.openingTime} onChange={onChangeNewCommonArea} />
                        </div>
                        <div className="times-group">
                            <label>Fecha ás:</label>
                            <input type="time" name="closingTime" value={formNewCommonArea.closingTime} onChange={onChangeNewCommonArea} />
                        </div>
                    </div>
                    <div className="reservation">
                        <div className="times-group">
                            <label>Tempo mín. reserva:</label>
                            <input type="time" name="minReservationTime" value={formNewCommonArea.minReservationTime} onChange={onChangeNewCommonArea} />
                        </div>
                        <div className="times-group">
                            <label>Tempo max. reserva:</label>
                            <input type="time" name="maxReservationTime" value={formNewCommonArea.maxReservationTime} onChange={onChangeNewCommonArea} />
                        </div>
                    </div>
                </div>

                <div className="msg-error">
                    <p id="errorText">{msgCommonArea}</p>
                </div>
            </Modal>

        </>
    )
}