import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../provider/axios";
import visit from "../../assets/visit.svg";
import Header from "components/Header/Header";
import Button from "components/Button/Button";
import "./syndicboard.css";
import pen from "../../assets/pen.svg";
import Tower from "components/Tower/Tower";
import AptView from "components/AptView/AptView";
import Card from "components/Card/Card";
import ModalConfirmation from "components/ModalConfirmation/ModalConfirmation";
import Input from "components/Input/Input";
import Modal from "components/Modal/Modal";

export default function Syndicboard() {
  const [towersData, setTowersData] = useState([]);
  const [openModalListResidents, setOpenModalListResidents] = useState(false);
  const [tower, setTower] = useState("");
  const [apartment, setApartment] = useState("");
  const [residentsByApartment, setResidentsByApartment] = useState([]);
  const [messageModalConfirm, setMessageModalConfirm] = useState("");
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [openModalEditResident, setOpenModalEditResident] = useState(false);
  const [modalDataEditResident, setModalDataEditResident] = useState({});
  const [msgResidents, setMsgResidents] = useState([]);
  const [dataListApartments, setdataListApartments] = useState([]);
  const [dataListTowers, setDataListTowers] = useState([]);
  const [openModalNewResident, setOpenModalNewResident] = useState(false);
  const [formNewResident, setformNewResident] = useState([]);
  const [showApartments, setShowApartments] = useState(false);
  const [isFacilitie, setIsFacilitie] = useState(JSON.parse(localStorage.getItem("role")) === "FACILITIES" ? true : false);


  //New Apartment
  const [openModalNewApartment, setOpenModalNewApartment] = useState(false);
  const [msgApartment, setMsgApartment] = useState([]);
  const [formNewApartment, setformNewApartment] = useState([]);

  //New Tower
  const [openModalNewTower, setOpenModalNewTower] = useState(false);
  const [msgTower, setMsgTower] = useState([]);
  const [formNewTower, setformNewTower] = useState([]);

  useEffect(() => {
    listTowers();
  }, [towersData]);

  function listTowers() {
    let condominiumId;
    if(isFacilitie){
      condominiumId = localStorage.getItem("condominiumId");
    }else{
      condominiumId = JSON.parse(localStorage.getItem("id"));
    }
    api
      .get(`/condominiums/${condominiumId}/towers`)
      .then((response) => {
        setTowersData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function listResidentsByApartment(apartmentId, apartmentName, towerName) {
    setApartment(apartmentName);
    setTower(towerName);
    sessionStorage.setItem("apartmentId", apartmentId);
    let condominiumId = JSON.parse(localStorage.getItem("id"));
    api
      .get(
        `/condominiums/towers/apartments/residents?apartment=${apartmentId}&condominium=${condominiumId}`
      )
      .then((response) => {
        setResidentsByApartment(response.data);
        setOpenModalListResidents(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function closeModalPutResidentsByApartment() {
    setResidentsByApartment([]);
    setOpenModalListResidents(!openModalListResidents);
    setApartment("");
    setTower("");
  }

  //FUNCTIONS FROM POST RESIDENT
  function onChangeNewResident(event) {
    setformNewResident({
      ...formNewResident,
      [event.target.name]: event.target.value,
    });
    if (event.target.name === "tower") {
      setShowApartments(true)
      getAllApartmentsByTower(event.target.value)
    }

  }

  function registeringNewResident() {
    getAllTowersByCondominum()
    setOpenModalNewResident(!openModalNewResident);
  }

  function getAllTowersByCondominum() {
    let condominiumId = JSON.parse(localStorage.getItem("id"));
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
        setdataListApartments(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function validationsPostResident() {
    newResident();
  }

  function newResident() {
    let condominiumId = JSON.parse(localStorage.getItem("id"));
    api
      .post(
        `/condominiums/towers/apartments/residents?apartment=${formNewResident.apartment}&condominium=${condominiumId}`,
        {
          fullName: formNewResident.fullName,
          cpf: formNewResident.cpf,
          email: formNewResident.email,
          phone: formNewResident.phone,
          birthDate: formNewResident.birthDate,
          gender: formNewResident.gender,
          isPrimaryResident: false,
        }
      )
      .then((response) => {
        setMsgResidents("Morador cadastrado com sucesso!");
      })
      .catch((error) => {
        setMsgResidents("Preencha corretamente os campos! Obs: verifique se o CPF está correto.");
      });
  }

  function closeModalPostResident() {
    setOpenModalNewResident(!openModalNewResident);
    setMsgResidents("");
    setShowApartments(false)
  }

  //FUNCTIONS FROM PUT RESIDENT

  function onChangePutResidents(field, data) {
    setModalDataEditResident({ ...modalDataEditResident, [field]: data });
  }

  function validationsEditResident() {
    putResident(modalDataEditResident.id);
  }

  function getResidentData(residentId) {
    api
      .get(`/condominiums/towers/apartments/residents/${residentId}`)
      .then((response) => {
        setOpenModalEditResident(!openModalEditResident);
        setModalDataEditResident(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function putResident(residentId) {
    api
      .put(`/condominiums/towers/apartments/residents/${residentId}`, {
        fullName: modalDataEditResident.fullName,
        cpf: modalDataEditResident.cpf,
        email: modalDataEditResident.email,
        phone: modalDataEditResident.phone,
        birthDate: modalDataEditResident.birthDate,
        gender: modalDataEditResident.gender,
      })
      .then((response) => {
        listResidentsByApartment(
          modalDataEditResident.apartmentId,
          apartment,
          tower
        );
        closeModalPutResident();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function closeModalPutResident() {
    setOpenModalEditResident(!openModalEditResident);
    setModalDataEditResident({});
    setMsgResidents("");
  }

  //FUNCTIONS FROM DELETE RESIDENT
  function confirmDelete(residentId, residenteName) {
    setOpenModalConfirm(!openModalConfirm);
    setMessageModalConfirm(`Deseja excluir o morador ${residenteName}?`);
    sessionStorage.setItem("deleteResidentId", residentId);
  }

  function deleteResident() {
    let deleteResidentId = sessionStorage.getItem("deleteResidentId");
    let apartmentId = sessionStorage.getItem("apartmentId");
    api
      .delete(`/condominiums/towers/apartments/residents/${deleteResidentId}`)
      .then((response) => {
        sessionStorage.removeItem("deleteUserId");
        listResidentsByApartment(apartmentId, apartment, tower);
        sessionStorage.removeItem("apartmentId");
        closeModalConfirm();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function closeModalConfirm() {
    setOpenModalConfirm(!openModalConfirm);
    setMessageModalConfirm("");
  }

  //FUNCTIONS FROM POST NEW Aparmtment
  function onChangeNewApartment(event) {
    setformNewApartment({
      ...formNewApartment,
      [event.target.name]: event.target.value,
    });
  }

  function closeModalPostApartment() {
    setOpenModalNewApartment(!openModalNewApartment);
    setMsgApartment("");
    setTower([]);
  }

  function registeringNewApartment() {
    getAllTowersByCondominum()
    setOpenModalNewApartment(!openModalNewApartment);
  }

  function validationsPostApartments() {
    let numberApartmentTrimed = formNewApartment.numberApartment.trim()
    if (numberApartmentTrimed === undefined || numberApartmentTrimed === "" || numberApartmentTrimed === null || formNewApartment.tower === "") {
      setMsgApartment("Preencha corretamente os campos")
    } else {
      newApartment()
    }
  }

  function newApartment() {
    let condominiumId = JSON.parse(localStorage.getItem("id"));
    api
      .post(
        `/condominiums/${condominiumId}/towers/${formNewApartment.tower}/apartments`,
        {
          name: formNewApartment.numberApartment
        }
      )
      .then((response) => {
        setMsgApartment("Apartamento cadastrado com sucesso!");
      })
      .catch((error) => {
        console.log(error);
      });

  }

  //FUNCTION FROM POST NEW TOWER

  function onChangeNewTower(event) {
    setformNewTower({
      ...formNewTower,
      [event.target.name]: event.target.value,
    });
  }

  function closeModalPostTower() {
    setOpenModalNewTower(!openModalNewTower);
    setMsgTower("");
    setTowersData([]);
  }

  function registeringNewTower() {
    setOpenModalNewTower(!openModalNewTower);
  }

  function validationsPostTower() {
    let nameTowerTrimed = formNewTower.nameTower.trim()
    if (nameTowerTrimed === undefined || nameTowerTrimed === null || nameTowerTrimed === "") {
      setMsgTower("Preencha corretamente os campos")
    } else {
      newTower()
      console.log(nameTowerTrimed)
    }
  }

  function newTower() {
    let condominiumId = JSON.parse(localStorage.getItem("id"));
    api
      .post(
        `/condominiums/${condominiumId}/towers`,
        {
          name: formNewTower.nameTower
        }
      )
      .then((response) => {
        setMsgTower("Torre cadastrada com sucesso!");
      })
      .catch((error) => {
        console.log(error);
      });
  }


  return (
    <>
      <div className="syndicboard-background">
        <div className="headerSindico">{
          isFacilitie ?
            <Header
              title="Visão Geral"
              page1="Visão Geral"
              link1="/sindico-visao-geral"
              page2="Entregas"
              link2="/entregas"
            />
            :
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
            />
        }
        </div>

        {
          !isFacilitie ?
            <div className="register">
              <Button className={"btnAllVision"} click={() => registeringNewTower()}>Cadastrar Torre</Button>
              <Button className={"btnAllVision"} click={() => registeringNewApartment()}>Cadastrar Apartamento</Button>
              <Button className={"btnAllVision"} click={() => registeringNewResident()}>Cadastrar Morador</Button>
            </div>
            :
            null
        }

        <div className="towers">
          {towersData?.map((tower, index) => (
            <Tower key={tower.id} name={tower.name}>
              {tower.apartments.map((apartment) => (
                <Button
                  key={apartment.id}
                  className={"btnApartment"}
                  click={() =>
                    listResidentsByApartment(
                      apartment.id,
                      apartment.name,
                      tower.name
                    )
                  }
                >
                  {apartment.name}
                  <img
                    src={pen}
                    alt="Imagem de um lápis"
                    style={{ width: "15px", height: "15px" }}
                  />
                </Button>
              ))}
            </Tower>
          ))}
        </div>
      </div>
      <AptView
        isOpen={openModalListResidents}
        setModalOpen={() => closeModalPutResidentsByApartment()}
        apt={apartment}
        tower={tower}
      >
        {residentsByApartment?.map((resident) => (
          <Card
            key={resident.id}
            img={visit}
            name={resident.fullName}
            cpf={resident.cpf}
            email={resident.email}
            edit={() => getResidentData(resident.id)}
            delete={() => confirmDelete(resident.id, resident.fullName)}
          ></Card>
        ))}
      </AptView>

      {/*MODAL FROM REGISTER NEW RESIDENT*/}

      <Modal
        isOpen={openModalNewResident}
        setModalOpen={() => closeModalPostResident()}
        click={() => validationsPostResident()}
        nameButton={"Cadastrar"}
      >
        <div className="modal-resident">
          <Input
            label={"Nome:"}
            name={"fullName"}
            onChange={onChangeNewResident}
          />
          <Input
            label={"Email:"}
            name={"email"}
            type={"email"}
            onChange={onChangeNewResident}
          />
          <Input
            label={"CPF:"}
            name={"cpf"}
            onChange={onChangeNewResident}
          />
          <Input
            label={"Telefone:"}
            name={"phone"}
            type={"number"}
            onChange={onChangeNewResident}
          />
          <div className="gender">
            <div className="title">
              <label htmlFor="">Gênero:</label>
            </div>
            <select
              name="gender"
              id="select-gender"
              onChange={onChangeNewResident}
            >
              <option value=""></option>
              <option value="MASC">Masculino</option>
              <option value="FEME">Feminino</option>
            </select>
          </div>
          <Input
            label={"Data de nascimento:"}
            name={"birthDate"}
            type={"date"}
            onChange={onChangeNewResident}
          />
          <div className="house">
            <div className="tower-modal">
              <label >Torre:</label>
              <div className="selectModal">
                <select name="tower" id="" onChange={onChangeNewResident}>
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
                  <select name="apartment" id="" onChange={onChangeNewResident}>
                    <option value=""></option>
                    {dataListApartments?.map((apartment) => (
                      <option key={apartment.id} value={apartment.id}>{apartment.name}</option>
                    ))}
                  </select>
                </div>
                : null
            }
          </div>
          <div className="msg-error">
            <p id="errorText">{msgResidents}</p>
          </div>
        </div>
      </Modal>

      {/* MODAL FROM EDIT RESIDENT */}

      <Modal
        isOpen={openModalEditResident}
        setModalOpen={() => closeModalPutResident()}
        click={() => validationsEditResident()}
        nameButton={"Cadastrar"}
      >
        <div className="modal-resident">
          <Input
            label={"Nome:"}
            name={"name"}
            value={modalDataEditResident.fullName}
            onChange={(e) => onChangePutResidents("fullName", e.target.value)}
          />
          <Input
            label={"Email:"}
            name={"email"}
            value={modalDataEditResident.email}
            type={"email"}
            onChange={(e) => onChangePutResidents("email", e.target.value)}
          />
          <Input
            label={"CPF:"}
            name={"cpf"}
            value={modalDataEditResident.cpf}
            onChange={(e) => onChangePutResidents("cpf", e.target.value)}
          />
          <Input
            label={"Telefone:"}
            name={"phone"}
            value={modalDataEditResident.phone}
            type={"number"}
            onChange={(e) => onChangePutResidents("phone", e.target.value)}
          />
          <div className="gender">
            <div className="title">
              <label htmlFor="">Gênero:</label>
            </div>
            <select
              name="gender"
              id="select-gender"
              value={modalDataEditResident.gender}
              onChange={(e) => onChangePutResidents("gender", e.target.value)}
            >
              <option value=""></option>
              <option value="MASC">Masculino</option>
              <option value="FEME">Feminino</option>
            </select>
          </div>
          <Input
            label={"Data de nascimento:"}
            name={"birthDate"}
            value={modalDataEditResident.birthDate}
            type={"date"}
            onChange={(e) => onChangePutResidents("birthDate", e.target.value)}
          />
          <div className="msg-error">
            <p id="errorText">{msgResidents}</p>
          </div>
        </div>
      </Modal>

      {/*MODAL FROM DELETE RESIDENT  */}
      <ModalConfirmation
        isOpen={openModalConfirm}
        setModalOpen={() => closeModalConfirm()}
        message={messageModalConfirm}
        clickCancel={() => closeModalConfirm()}
        clickConfirm={() => deleteResident()}
      ></ModalConfirmation>

      {/*MODAL FROM REGISTER NEW APARTMENT */}
      <Modal
        isOpen={openModalNewApartment}
        setModalOpen={() => closeModalPostApartment()}
        click={() => validationsPostApartments()}
        nameButton={"Cadastrar"}
      >
        <div className="modal-new-apartment">
          <Input
            label={"Número do apartamento:"}
            name={"numberApartment"}
            value={formNewApartment.numberApartment}
            onChange={onChangeNewApartment}
          />
          <label htmlFor="">Torre:</label>
          <div className="selectModal">
            <select name="tower" id="" onChange={onChangeNewApartment}>
              <option value=""></option>
              {dataListTowers?.map((tower) => (
                <option key={tower.id} value={tower.id}>{tower.name}</option>
              ))}
            </select>
          </div>
          <div className="msg-error">
            <p id="errorText">{msgApartment}</p>
          </div>
        </div>
      </Modal>
      {/* MODAL FROM REGISTER NEW TOWER */}
      <Modal
        isOpen={openModalNewTower}
        setModalOpen={() => closeModalPostTower()}
        click={() => validationsPostTower()}
        nameButton={"Cadastrar"}
      >
        <Input
          label={"Nome da Torre:"}
          name={"nameTower"}
          value={formNewTower.nameTower}
          onChange={onChangeNewTower}
        />
        <div className="msg-error">
          <p id="errorText">{msgTower}</p>
        </div>
      </Modal>
    </>
  );
}
