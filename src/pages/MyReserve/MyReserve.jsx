/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { api } from "../../provider/axios";
import "./myreserve.css";
import Header from "components/Header/Header";
import Button from "components/Button/Button";
import Reservation from "components/Reservation/Reservation";
import Modal from "components/Modal/Modal";
import Input from "components/Input/Input";
import ModalConfirmation from "components/ModalConfirmation/ModalConfirmation";

export default function MyReserve() {
  const [data, setData] = useState([]);
  const [dataAreas, setDataAreas] = useState([]);
  const [modalData, setModalData] = useState({});
  const [msg, setMsg] = useState([]);
  const [openModalReserve, setOpenModalReserve] = useState(false);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [isNewReserve, setIsNewReserve] = useState(false);
  const [messageModalConfirm, setMessageModalConfirm] = useState("");
  
  useEffect(() => {
    getCommonAreas();
  }, []);

  useEffect(() => {
    listReserves()
  }, [modalData])

  const condominiumId = localStorage.getItem("condominiumId");
  const id = JSON.parse(localStorage.getItem("id"));

  function onChange(field, data) {
    setModalData({ ...modalData, [field]: data });
  }

  function listReserves() {
    api
      .get(`/condominiums/common-areas/reserves/resident/${id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getCommonAreas() {
    api
      .get(`/condominiums/${condominiumId}/common-areas`)
      .then((response) => {
        setDataAreas(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getReserveData(reserveId){
    setIsNewReserve(false)
    api
      .get(`/condominiums/common-areas/reserves/${reserveId}`)
      .then((response) => {
        setOpenModalReserve(!openModalReserve);
        setModalData(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function registerNewReserve(){
    setIsNewReserve(true);
    setOpenModalReserve(!openModalReserve);
  }

  function validationsReserve(){
    if(isNewReserve){
      newReserve()
    }else{
      putReserve(modalData.id)
    }
  }

  function newReserve() {
    api
      .post(
        `/condominiums/common-areas/reserves?commonAreaId=${modalData.plan}&residentId=${id}`,
        {
          startDateTime: `${modalData.startTime}:00`,
          endDateTime: `${modalData.endTime}:00`,
          date: modalData.date,
        }
      )
      .then((response) => {
        console.log(response.status);
        setMsg("Reserva feita!")
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function putReserve(reserveId) {
    console.log(modalData.commonAreaId)
    api
      .put(`/condominiums/common-areas/reserves/${reserveId}`, {
        startDateTime: modalData.startDateTime,
        endDateTime: modalData.endDateTime,
        date: modalData.date,
        commonAreaId: modalData.commonAreaId
      })
      .then((response) => {
        closeModal();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function closeModal(){
    setOpenModalReserve(!openModalReserve)
    setModalData({});
    setMsg("")
  }


  // DELETE RESERVE

  function confirmDelete(reserveId, commonAreaName, date){
    setOpenModalConfirm(!openModalConfirm)
    setMessageModalConfirm(`Deseja cancelar sua reserva no(a) ${commonAreaName} do dia ${date}?`)
    sessionStorage.setItem("deleteReserveId", reserveId)
  }

  function deleteReserve(){
    let deleteReserveId = sessionStorage.getItem("deleteReserveId")
    api
        .delete(`/condominiums/common-areas/reserves/${deleteReserveId}`)
        .then((response) => {
          sessionStorage.removeItem("deleteReserveId");
          closeModalConfirm();
        })
        .catch((error) => {
          console.log(error);
        });
  }

  function closeModalConfirm(){
    setOpenModalConfirm(!openModalConfirm)
    setModalData({})
  }



  return (
    <>
      <div className="myreserve-background">
        <div className="header-myreserve">
          <Header
            condominium={localStorage.getItem("condominiumName")}
            title="Reservas"
            page1="Mural de Avisos"
            link1="/mural-de-avisos"
            page2="Meus Recebidos"
            link2="/meus-recebidos"
            page3="Meu Apartamento"
            link3="/meu-apartamento"
            page4="Reservas"
            link4="/reservas"
            page5="Contas"
            link5="/contas"
          />
        </div>
        <div className="myreserve-search">
          <p>Minhas Reservas:</p>
          <Button
            className={"btnReserve"}
            click={() => registerNewReserve()}
          >
            Nova Reserva
          </Button>
        </div>
        <div className="myreserve-box">
          <div className="myreserve-board">
            {data?.map((reserves) => (
              <Reservation
                key={reserves.id}
                day={reserves.date}
                time1={reserves.startDateTime}
                time2={reserves.endDateTime}
                commonAreaName={reserves.commonAreaName}
                edit={() => getReserveData(reserves.id)}
                delete={() => confirmDelete(reserves.id, reserves.commonAreaName, reserves.date) }
              />
            ))}
          </div>
        </div>
      </div>

      <Modal
        isOpen={openModalReserve}
        setModalOpen={() => closeModal()}
        click={() => validationsReserve()}
        nameButton={"Cadastrar"}
      >
        <div className="reserve-modal">
          <div className="select-areas">
            <div className="title">
              <label htmlFor="">Área</label>
            </div>
            <select name="plan" value={modalData.commonAreaId} onChange={(e) => onChange("plan", e.target.value)} >
              <option value=""></option>
              {dataAreas?.map((areas) => (
                <option value={areas.id}>{areas.name}</option>
              ))}
            </select>
          </div>
          <div className="date">
            <Input
              label={"Data:"}
              name={"date"}
              type={"date"}
              value={modalData.date}
              onChange={(e) => onChange("date", e.target.value)}
            />
          </div>
          <div className="hours">
            <Input
              label={"Inicio:"}
              name={"startTime"}
              type={"time"}
              value={modalData.startDateTime}
              onChange={(e) => onChange("startTime", e.target.value)}
            />
            <Input
              label={"Fim:"}
              name={"endTime"}
              type={"time"}
              value={modalData.endDateTime}
              onChange={(e) => onChange("endTime", e.target.value)}
            />
          </div>
          <div className="msg-error">
            <p id="errorText">{msg}</p>
          </div>
        </div>
      </Modal>

      <ModalConfirmation
        isOpen={openModalConfirm}
        setModalOpen={() => closeModalConfirm()}
        message={messageModalConfirm}
        clickCancel={() => closeModalConfirm()}
        clickConfirm={() => deleteReserve()}
      ></ModalConfirmation>
    </>
  );
}
