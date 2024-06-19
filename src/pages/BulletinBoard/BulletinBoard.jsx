/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./bulletinBoard.css";
import BoxWarning from "./components/BoxWarning";
import { api } from "provider/axios";
import EmptyState from "components/EmptyState/EmptyState";
import Header from "components/Header/Header";
import Button from "components/Button/Button";
import Modal from "components/Modal/Modal";
import Input from "components/Input/Input";
export default function BulletinBoard() {

    const [data, setData] = useState([]);
    const [infoResident, setInfoResident] = useState([]);
    const [formModalNewNotice, setFormModalNewNotice] = useState([]);
    const [openModalNewNotice, setOpenModalNewNotice] = useState(false);
    useEffect(() => {
        list();
    }, []);

    useEffect(() => {
        list();
    }, [data]);

    var link1, link2, link3, link4, link5
    var page1, page2, page3, page4, page5

    function onChangeNewResident(event) {
        setFormModalNewNotice({
            ...formModalNewNotice,
            [event.target.name]: event.target.value,
        });
    }

    const role = JSON.parse(localStorage.getItem("role"))
    // console.log(role)

    function getResidentInfos() {
        const idResident = JSON.parse(localStorage.getItem("id"));
        api.get(`/condominiums/towers/apartments/residents/${idResident}`)
            .then((response) => {
                localStorage.setItem("condominiumId", response.data.condominiumId);
                localStorage.setItem("apartmentId", response.data.apartmentId);
                setInfoResident(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function list() {
        if (role === "RESIDENT") { getResidentInfos() }
        let condominiumId;
        role === "CONDOMINIUM" ?
            condominiumId = JSON.parse(localStorage.getItem("id")) :
            condominiumId = localStorage.getItem("condominiumId");
        // console.log(JSON.parse(localStorage.getItem("id")))
        // console.log(localStorage.getItem("condominiumId"))
        api.get(`/condominiums/${condominiumId}/notices`)
            .then((response) => {
                setData(response.data);
                // getCondominiumInfos()
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function validationsNewNotice() {
        if ((formModalNewNotice.title !== "" && formModalNewNotice.title !== null && formModalNewNotice.title !== undefined) ||
            (formModalNewNotice.description !== "" && formModalNewNotice.description !== null && formModalNewNotice.description !== undefined)) {
            newNotice()
        } else {
            console.log("Validação errada")
        }
    }

    function newNotice() {
        let condominiumId = JSON.parse(localStorage.getItem("id"));
        api.post(`/condominiums/${condominiumId}/notices`, {
            title: formModalNewNotice.title,
            description: formModalNewNotice.description
        })
            .then((response) => {
                setOpenModalNewNotice(!openModalNewNotice)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    if (role === "CONDOMINIUM") {
        page1 = "Visão Geral"
        link1 = "/sindico-visao-geral"
        page2 = "Mural de Avisos"
        link2 = "/mural-de-avisos"
        page3 = "Áreas Comuns"
        link3 = "/areas-comuns"
        page4 = "Funcionários"
        link4 = "/funcionarios"
    }

    if (role === "RESIDENT") {
        page1 = "Visão Geral"
        page1 = "Mural de Avisos"
        link1 = '/mural-de-avisos'
        page2 = "Meus Recebidos"
        link2 = "/meus-recebidos"
        page3 = "Meu Apartamento"
        link3 = "/meu-apartamento"
        page4 = "Reservas"
        link4 = "/reservas"
        page5 = "Contas"
        link5 = "/contas"
    }

    if (data.length === 0 && role === "CONDOMINIUM") {
        return (
            <>
                <Header
                    condominium={localStorage.getItem("condominiumName")}
                    title="Mural De Avisos"
                    page1={page1}
                    link1={link1}
                    page2={page2}
                    link2={link2}
                    page3={page3}
                    link3={link3}
                    page4={page4}
                    link4={link4}
                    page5={page5}
                    link5={link5}
                ></Header>
                <div className="new-notice">
                    <div className="notice-container">
                        <Button className={"btnPrimary"} click={() => setOpenModalNewNotice(!openModalNewNotice)}>Novo Aviso</Button>
                    </div>
                </div>
                <EmptyState
                    text={"Nenhum aviso foi publicado"}
                ></EmptyState>
                <Modal
                isOpen={openModalNewNotice}
                setModalOpen={() => setOpenModalNewNotice(!openModalNewNotice)}
                click={() => validationsNewNotice()}
                nameButton={"Cadastrar"}
            >
                <div className="modal-notice">
                    <div className="itens">
                        <Input
                            label={"Título do aviso:"}
                            name={"title"}
                            onChange={onChangeNewResident}
                        />
                        <div className="area-box">
                            <div className="title">Mensagem:</div>
                            <textarea name="description" onChange={onChangeNewResident} id="textArea" cols="30" rows="10"></textarea>
                        </div>
                    </div>
                </div>
            </Modal>
            </>
        );
    }


    return (
        <>
            <Header
                condominium={localStorage.getItem("condominiumName")}
                title="Mural De Avisos"
                page1={page1}
                link1={link1}
                page2={page2}
                link2={link2}
                page3={page3}
                link3={link3}
                page4={page4}
                link4={link4}
                page5={page5}
                link5={link5}
            ></Header>

            {
                role === "CONDOMINIUM" || role === "FACILITIES" ?
                    <div className="new-notice">
                        <div className="notice-container">
                            <Button className={"btnPrimary"} click={() => setOpenModalNewNotice(!openModalNewNotice)}>Novo Aviso</Button>
                        </div>
                    </div>
                    : null
            }

            {
                data.length === 0 ?
                    <EmptyState
                        text={"Nenhum aviso foi publicado"}
                    ></EmptyState>
                    :
                    <div className="board-background">
                        <div className="board-content">
                            <div className="notices">
                                {data?.map((notice) => (
                                    <BoxWarning
                                        key={notice.id}
                                        title={notice.title}
                                        text={notice.description}
                                        date={notice.createdAt}
                                    ></BoxWarning>
                                ))
                                }
                            </div>
                        </div>
                    </div>
            }

            <Modal
                isOpen={openModalNewNotice}
                setModalOpen={() => setOpenModalNewNotice(!openModalNewNotice)}
                click={() => validationsNewNotice()}
                nameButton={"Cadastrar"}
            >
                <div className="modal-notice">
                    <div className="itens">
                        <Input
                            label={"Título do aviso:"}
                            name={"title"}
                            onChange={onChangeNewResident}
                        />
                        <div className="area-box">
                            <div className="title">Mensagem:</div>
                            <textarea name="description" onChange={onChangeNewResident} id="textArea" cols="30" rows="10"></textarea>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}
