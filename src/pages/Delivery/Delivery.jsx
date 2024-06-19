import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./delivery.css"
import Header from "components/Header/Header";
import Button from "components/Button/Button";
import Tracking from "components/Tracking/Tracking";
import { api } from "provider/axios";
import Input from "components/Input/Input";
import Modal from "components/Modal/Modal";
import ModalConfirmation from "components/ModalConfirmation/ModalConfirmation";

export default function Delivery() {

  const [packagesData, setPackagesData] = useState([]);
  const [openModalNewPackage, setOpenModalNewPackage] = useState(false);
  const [formNewPackage, setFormNewPackage] = useState([]);
  const [showApartments, setShowApartments] = useState(false);
  const [dataListTowers, setDataListTowers] = useState([]);
  const [dataListApartments, setDataListApartments] = useState([]);
  const [msgPackages, setMsgPackages] = useState([]);
  const [isFacilitie, setIsFacilitie] = useState(JSON.parse(localStorage.getItem("role")) === "FACILITIES" ? true : false);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [messageModalConfirm, setMessageModalConfirm] = useState("");



  useEffect(() => {
    listAllPackages();
  }, [packagesData]);

  useEffect(() => {
    getAllTowersByCondominum();
  }, [dataListTowers]);


  function listAllPackages() {
    let condominiumId = JSON.parse(localStorage.getItem("id"));
    api.get(`/condominium/${condominiumId}/packages`)
      .then((response) => {
        setPackagesData(response.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function getAllTowersByCondominum() {
    let condominiumId;
    if(isFacilitie){
      condominiumId = localStorage.getItem("condominiumId");
    }else{
      condominiumId = JSON.parse(localStorage.getItem("id"));
    }
    api
      .get(
        `/condominiums/${condominiumId}/towers`
      )
      .then((response) => {
        setDataListTowers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getAllApartmentsByTower(towerId) {
    let condominiumId;
    if(isFacilitie){
      condominiumId = localStorage.getItem("condominiumId");
    }else{
      condominiumId = JSON.parse(localStorage.getItem("id"));
    }
    api
      .get(
        `/condominiums/${condominiumId}/towers/${towerId}/apartments`)
      .then((response) => {
        setDataListApartments(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function delivered(id) {
    let condominiumId;
    if(isFacilitie){
      condominiumId = localStorage.getItem("condominiumId");
    }else{
      condominiumId = JSON.parse(localStorage.getItem("id"));
    }
    api.patch(`/condominium/${condominiumId}/packages/${id}/delivered`)
      .then((response) => {
        setPackagesData([]);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  // NEW PACKAGE
  function onChangeNewEmployee(event) {
    setFormNewPackage({
      ...formNewPackage,
      [event.target.name]: event.target.value,
    });
    if (event.target.name === "tower") {
      setShowApartments(true)
      getAllApartmentsByTower(event.target.value)
    }
  }

  function closeModal() {
    setOpenModalNewPackage(!openModalNewPackage)
    setMsgPackages("")
    setShowApartments(false)
  }

  function validationsPackages() {
    newPackage(formNewPackage.apartment)
  }

  function newPackage(apartmentId) {
    let condominiumId;
    if(isFacilitie){
      condominiumId = localStorage.getItem("condominiumId");
    }else{
      condominiumId = JSON.parse(localStorage.getItem("id"));
    }
    api.post(`/condominium/${condominiumId}/packages?apartment=${apartmentId}`,{
      code: formNewPackage.code,
      description: formNewPackage.description
    })
      .then((response) => {
        setMsgPackages("Pacote cadastrado com sucesso!")
      })
      .catch((error) => {
        setMsgPackages("Preencha corretamente os campos! Obs: os códigos são exclusivos de apenas um pacote.")
      })
  }

  // MODAL CONFIRM

  function confirmDelivered(id, code){
    setOpenModalConfirm(!openModalConfirm)
    setMessageModalConfirm(`Deseja marcar como entregue o objeto "${code}"?`)
    sessionStorage.setItem("deliveredId", id)
  }

  function delivered() {
    let condominiumId;
    if(isFacilitie){
      condominiumId = localStorage.getItem("condominiumId");
    }else{
      condominiumId = JSON.parse(localStorage.getItem("id"));
    }
    let deliveredId = sessionStorage.getItem("deliveredId")
    api.patch(`/condominium/${condominiumId}/packages/${deliveredId}/delivered`)
      .then((response) => {
        sessionStorage.removeItem("deliveredId");
        setPackagesData([]);
        closeModalConfirm();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function closeModalConfirm(){
    setOpenModalConfirm(!openModalConfirm)
  }

  
  return (
    <>

      <div className="delivery-background">
        <div className="header-delivery">
          <Header
            title="Entregas"
            page1="Visão Geral"
            link1='/sindico-visao-geral'
            page2="Entregas"
            link2="/entregas"
          />
        </div>
        <div className="delivery-search">
          <Button className={"btnDelivery"} click={() => setOpenModalNewPackage(!openModalNewPackage)}>Nova Entrega</Button>
        </div>
        <div className="delivery-box">
          <div className="delivery-board">
            <div className="awaiting">
              {packagesData.filter(item => !item.delivered).map((pack, index) => (
                <Tracking
                  key={pack.id}
                  trackingNumber={pack.code}
                  date={pack.receiptDate}
                  status1="Aguardando retirada"
                  apt={pack.apartmentName}
                  bloco={pack.towerName}
                  action={"Entregue"}
                  click={() => confirmDelivered(pack.id, pack.code)}
                />
              ))}
            </div>
            <div className="delivered">
              {packagesData.filter(item => item.delivered).map((pack, index) => (
                <Tracking
                  key={pack.id}
                  trackingNumber={pack.code}
                  date={pack.receiptDate}
                  status1="Retirado"
                  apt={pack.apartmentName}
                  bloco={pack.towerName}
                  action={"Retirado"}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={openModalNewPackage}
        setModalOpen={() => closeModal()}
        click={() => validationsPackages()}
        nameButton={"Cadastrar"}
      >
        <div className="modal-resident">
          <Input
            label={"Código:"}
            name={"code"}
            onChange={onChangeNewEmployee}
          />
          <Input
            label={"Descrição:"}
            name={"description"}
            onChange={onChangeNewEmployee}
          />
          <div className="house">
            <div className="tower-modal">
              <label >Torre:</label>
              <div className="selectModal">
                <select name="tower" id="" onChange={onChangeNewEmployee}>
                  <option value="" ></option>
                  {dataListTowers?.map((tower) => (
                    <option key={tower.id} value={tower.id}>{tower.name}</option>
                  ))}
                </select>
              </div>
            </div>
            {
              showApartments ?
                <div className="apartment-modal">
                  <div className="title">
                    <label htmlFor="">Apartamento:</label>
                  </div>
                  <div className="selectModal">
                    <select name="apartment" id="" onChange={onChangeNewEmployee}>
                      <option value=""></option>
                      {dataListApartments?.map((apartment) => (
                        <option key={apartment.id} value={apartment.id}>{apartment.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                : null
            }
          </div>
          <div className="msg-error">
            <p id="errorText">{msgPackages}</p>
          </div>
        </div>
      </Modal>

      <ModalConfirmation
        isOpen={openModalConfirm}
        setModalOpen={() => closeModalConfirm()}
        message={messageModalConfirm}
        clickCancel={() => closeModalConfirm()}
        clickConfirm={() => delivered()}
      ></ModalConfirmation>
    </>
  );
}