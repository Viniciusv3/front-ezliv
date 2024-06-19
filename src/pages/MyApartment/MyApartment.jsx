/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./myApartment.css";
import { api } from "provider/axios";
import Header from "components/Header/Header";
import Card from "components/Card/Card";
import BoxReceived from "pages/MyReceived/components/BoxReceived/BoxReceived";
import Button from "components/Button/Button";
import visit from "../../assets/visit.svg";
import Modal from "components/Modal/Modal";
import Input from "components/Input/Input";
import ModalConfirmation from "components/ModalConfirmation/ModalConfirmation";

export default function MyApartment() {
  const [dataResident, setDataResident] = useState([]);
  const [dataVisitors, setDataVisitors] = useState([]);
  const [openModalResidents, setOpenModalResidents] = useState(false);
  const [openModalVisitors, setOpenModalVisitors] = useState(false);
  const [msgResidents, setMsgResidents] = useState([]);
  const [msgVisitors, setMsgVisitors] = useState([]);
  const [modalDataResident, setModalDataResident] = useState({});
  const [modalDataVisitor, setModalDataVisitor] = useState({});
  const [isNewResident, setIsNewResident] = useState(false);
  const [isNewVisitor, setIsNewVisitor] = useState(false);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [messageModalConfirm, setMessageModalConfirm] = useState("");
  const [isResident, setIsResident] = useState(false);

  useEffect(() => {
    listVisitors();
    listResident();
  }, []);

  useEffect(() => {
    listResident();
  }, [modalDataResident]);

  useEffect(() => {
    listVisitors();
  }, [modalDataVisitor]);

  const apartmentId = localStorage.getItem("apartmentId");
  const condominiumId = localStorage.getItem("condominiumId");

  //LIST/CREATE/PUT RESIDENTS

  function listResident() {
    api
      .get(
        `/condominiums/towers/apartments/residents?apartment=${apartmentId}&condominium=${condominiumId}`
      )
      .then((response) => {
        setDataResident(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function onChangeResidents(field, data) {
    setModalDataResident({ ...modalDataResident, [field]: data });
  }

  function registeringNewResident() {
    setIsNewResident(true);
    setOpenModalResidents(!openModalResidents);
  }

  function validationsResidents() {
    if (isNewResident) {
      newResident();
    } else {
      putResident(modalDataResident.id);
    }
  }

  function newResident() {
    api
      .post(
        `/condominiums/towers/apartments/residents?apartment=${apartmentId}&condominium=${condominiumId}`,
        {
          fullName: modalDataResident.fullName,
          cpf: modalDataResident.cpf,
          email: modalDataResident.email,
          phone: modalDataResident.phone,
          birthDate: modalDataResident.birthDate,
          gender: modalDataResident.gender,
          isPrimaryResident: false,
        }
      )
      .then((response) => {
        setMsgResidents("Morador cadastrado com sucesso!");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getResidentData(residentId) {
    setIsNewResident(false);
    api
      .get(`/condominiums/towers/apartments/residents/${residentId}`)
      .then((response) => {
        setOpenModalResidents(!openModalResidents);
        setModalDataResident(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function putResident(residentId) {
    api
      .put(`/condominiums/towers/apartments/residents/${residentId}`, {
        fullName: modalDataResident.fullName,
        cpf: modalDataResident.cpf,
        email: modalDataResident.email,
        phone: modalDataResident.phone,
        birthDate: modalDataResident.birthDate,
        gender: modalDataResident.gender,
      })
      .then((response) => {
        closeModalResident();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function closeModalResident() {
    setOpenModalResidents(!openModalResidents);
    setModalDataResident({});
    setMsgResidents([]);
  }

  //LIST/CREATE/PUT VISITORS

  function listVisitors() {
    api
      .get(`/condominium/apartments/visitors?apartment=${apartmentId}`)
      .then((response) => {
        setDataVisitors(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function onChangeVisitors(field, data) {
    setModalDataVisitor({ ...modalDataVisitor, [field]: data });
  }

  function registeringNewVisitor() {
    setIsNewVisitor(true);
    setOpenModalVisitors(!openModalVisitors);
  }

  function validationsVisitors() {
    if (isNewVisitor) {
      newVisitor();
    } else {
      putVisitor(modalDataVisitor.id);
    }
  }

  function newVisitor() {
    api
      .post(`/condominium/apartments/visitors?apartment=${apartmentId}`, {
        name: modalDataVisitor.name,
        email: modalDataVisitor.email,
        cpf: modalDataVisitor.cpf,
        releaseDate: `${modalDataVisitor.releaseDate} ${modalDataVisitor.releaseTime}:00`,
        untilDate: `${modalDataVisitor.untilDate} ${modalDataVisitor.untilTime}:00`,
      })
      .then((response) => {
        setMsgVisitors("Visitante cadastrado com sucesso!");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getVisitorData(visitorId) {
    setIsNewVisitor(false);
    api
      .get(`/condominium/apartments/visitors/${visitorId}`)
      .then((response) => {
        setOpenModalVisitors(!openModalVisitors);
        setModalDataVisitor(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function putVisitor(visitorId) {
    api
      .put(`/condominium/apartments/visitors/${visitorId}`, {
        name: modalDataVisitor.name,
        email: modalDataVisitor.email,
        cpf: modalDataVisitor.cpf,
        releaseDate: `${modalDataVisitor.releaseDate} ${modalDataVisitor.releaseTime}:00`,
        untilDate: `${modalDataVisitor.untilDate} ${modalDataVisitor.untilTime}:00`,
      })
      .then((response) => {
        closeModalVisitor();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function closeModalVisitor() {
    setOpenModalVisitors(!openModalVisitors);
    setModalDataVisitor({});
    setMsgVisitors("")
  }

  //DELETE RESIDENT/VISITOR

  function checkRole(userId, userName) {
    setIsResident(true);
    confirmDelete(userId, userName);
  }

  function confirmDelete(userId, userName) {
    setOpenModalConfirm(!openModalConfirm);
    let role;
    isNewResident ? (role = "morador") : (role = "vistante");
    setMessageModalConfirm(`Deseja excluir o ${role} ${userName}?`);
    sessionStorage.setItem("deleteUserId", userId);
  }

  function deleteUser() {
    let deleteUserId = sessionStorage.getItem("deleteUserId");
    if (isResident) {
      api
        .delete(`/condominiums/towers/apartments/residents/${deleteUserId}`)
        .then((response) => {
          sessionStorage.removeItem("deleteUserId");
          closeModalConfirm();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      api
        .delete(`/condominium/apartments/visitors/${deleteUserId}`)
        .then((response) => {
          sessionStorage.removeItem("deleteUserId");
          closeModalConfirm();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function closeModalConfirm() {
    setOpenModalConfirm(!openModalConfirm);
    isResident ? setModalDataResident({}) : setModalDataVisitor({});
    setIsResident(false);
  }

  return (
    <>
      <Header
        condominium={localStorage.getItem("condominiumName")}
        title="Meu Apartamento"
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
      ></Header>

      <div className="newUsers">
        <div className="actions">
          <Button
            className={"btnPrimary"}
            click={() => registeringNewResident()}
          >
            Cadastrar Morador
          </Button>
          <Button
            className={"btnPrimary"}
            click={() => registeringNewVisitor()}
          >
            Cadastrar Visitante
          </Button>
        </div>
      </div>

      <div className="background-apartament">
        <div className="boxes">
          <div className="resident">
            <BoxReceived title="Moradores">
              <div className="cards">
                {dataResident.length === 0
                  ? "Nenhum morador cadastrado"
                  : dataResident?.map((resident) => (
                      <Card
                        key={resident.id}
                        img={visit}
                        name={resident.fullName}
                        cpf={resident.cpf}
                        email={resident.email}
                        edit={() => getResidentData(resident.id)}
                        delete={() => checkRole(resident.id, resident.fullName)}
                      ></Card>
                    ))}
              </div>
            </BoxReceived>
          </div>
          <div className="visitors">
            <BoxReceived title="Visitantes">
              <div className="cards">
                {dataVisitors.length === 0
                  ? "Nenhum visitante cadastrado."
                  : dataVisitors?.map((visitor) => (
                      <Card
                        key={visitor.id}
                        img={visit}
                        name={visitor.name}
                        cpf={visitor.cpf}
                        email={visitor.email}
                        edit={() => getVisitorData(visitor.id)}
                        delete={() => confirmDelete(visitor.id, visitor.name)}
                      ></Card>
                    ))}
              </div>
            </BoxReceived>
          </div>
        </div>
      </div>

      <Modal
        isOpen={openModalResidents}
        setModalOpen={() => closeModalResident()}
        click={() => validationsResidents()}
        nameButton={"Cadastrar"}
      >
        <div className="modal-resident">
          <Input
            label={"Nome:"}
            name={"name"}
            value={modalDataResident.fullName}
            onChange={(e) => onChangeResidents("fullName", e.target.value)}
          />
          <Input
            label={"Email:"}
            name={"email"}
            value={modalDataResident.email}
            type={"email"}
            onChange={(e) => onChangeResidents("email", e.target.value)}
          />
          <Input
            label={"CPF:"}
            name={"cpf"}
            value={modalDataResident.cpf}
            onChange={(e) => onChangeResidents("cpf", e.target.value)}
          />
          <Input
            label={"Telefone:"}
            name={"phone"}
            value={modalDataResident.phone}
            type={"number"}
            onChange={(e) => onChangeResidents("phone", e.target.value)}
          />
          <div className="gender">
            <div className="title">
              <label htmlFor="">Gênero:</label>
            </div>
            <select
              name="gender"
              id="select-gender"
              value={modalDataResident.gender}
              onChange={(e) => onChangeResidents("gender", e.target.value)}
            >
              <option value=""></option>
              <option value="MASC">Masculino</option>
              <option value="FEME">Feminino</option>
            </select>
          </div>
          <Input
            label={"Data de nascimento:"}
            name={"birthDate"}
            value={modalDataResident.birthDate}
            type={"date"}
            onChange={(e) => onChangeResidents("birthDate", e.target.value)}
          />
          <div className="msg-error">
            <p id="errorText">{msgResidents}</p>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={openModalVisitors}
        setModalOpen={() => closeModalVisitor()}
        click={() => validationsVisitors()}
        nameButton={"Cadastrar"}
      >
        <div className="modal-visitors">
          <Input
            label={"Nome:"}
            name={"name"}
            value={modalDataVisitor.name}
            onChange={(e) => onChangeVisitors("name", e.target.value)}
          />
          <Input
            label={"Email:"}
            name={"email"}
            value={modalDataVisitor.email}
            type={"email"}
            onChange={(e) => onChangeVisitors("email", e.target.value)}
          />
          <Input
            label={"CPF:"}
            name={"cpf"}
            value={modalDataVisitor.cpf}
            onChange={(e) => onChangeVisitors("cpf", e.target.value)}
          />
          <div className="release">
            <Input
              label={"Liberado de:"}
              name={"releaseDate"}
              value={modalDataVisitor.releaseDate}
              type={"date"}
              onChange={(e) => onChangeVisitors("releaseDate", e.target.value)}
            />
            <Input
              name={"releaseTime"}
              type={"time"}
              value={modalDataVisitor.releaseTime}
              onChange={(e) => onChangeVisitors("releaseTime", e.target.value)}
            />
          </div>
          <div className="until">
            <Input
              label={"Até:"}
              name={"untilDate"}
              type={"date"}
              value={modalDataVisitor.untilDate}
              onChange={(e) => onChangeVisitors("untilDate", e.target.value)}
            />
            <Input
              name={"untilTime"}
              type={"time"}
              value={modalDataVisitor.untilTime}
              onChange={(e) => onChangeVisitors("untilTime", e.target.value)}
            />
          </div>
          <div className="msg-error">
            <p id="errorText">{msgVisitors}</p>
          </div>
        </div>
      </Modal>

      <ModalConfirmation
        isOpen={openModalConfirm}
        setModalOpen={() => closeModalConfirm()}
        message={messageModalConfirm}
        clickCancel={() => closeModalConfirm()}
        clickConfirm={() => deleteUser()}
      ></ModalConfirmation>
    </>
  );
}