/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./myReceived.css";
import { api } from "provider/axios";
import Header from "components/Header/Header";
import BoxReceived from "./components/BoxReceived/BoxReceived";
import ItenReceived from "../MyReceived/components/ItenReceived/ItenReceived";
import boxWaiting from "../../assets/boxWaiting.svg"
import boxReceived from "../../assets/boxReceived.svg";


export default function MyReceived() {

    const [data, setData] = useState([]);
    useEffect(() => {
        listPackages();
    }, []);

    const condominiumId = localStorage.getItem("condominiumId")
    const apartmentId = localStorage.getItem("apartmentId")

    function listPackages() {
        api.get(`/condominium/${condominiumId}/packages/apartment/${apartmentId}`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <>
            <Header
                condominium={localStorage.getItem("condominiumName")}
                title="Meus Recebidos"
                page1="Mural de Avisos"
                link1='/mural-de-avisos'
                page2="Meus Recebidos"
                link2="/meus-recebidos"
                page3="Meu Apartamento"
                link3="/meu-apartamento"
                page4="Reservas"
                link4="/reservas"
                page5="Contas"
                link5="/contas"
            ></Header>

            <div className="background-received">
                <div className="boxes">
                    <div className="waiting">
                        <BoxReceived
                            title="Aguardando Retirada">
                            <div className="itens-waiting">
                                {data.filter(iten => !iten.delivered).map(itenWaiting => (
                                    <ItenReceived
                                    img = {boxWaiting}
                                    code = {itenWaiting.code}
                                    status = "Aguardando Retirada"
                                    />
                                ))}
                            </div>
                        </BoxReceived>
                    </div>
                    <div className="removed">
                        <BoxReceived
                            title="Retirados">
                            <div className="itens-removed">
                            {data.filter(iten => iten.delivered).map(itenWaiting => (
                                    <ItenReceived
                                    img = {boxReceived}
                                    code = {itenWaiting.code}
                                    status = "Retirado"
                                    />
                                ))}
                            </div>
                        </BoxReceived>
                    </div>
                </div>
            </div>
        </>
    );
}