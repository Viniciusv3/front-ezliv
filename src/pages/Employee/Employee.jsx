import React, { useEffect, useState } from "react";
import { api } from "../../provider/axios";
import Header from "components/Header/Header";
import Button from "components/Button/Button";
import "./employee.css";
import Card from "components/Card/Card"
import Modal from "components/Modal/Modal";
import visit from "../../assets/visit.svg";
import ModalConfirmation from "components/ModalConfirmation/ModalConfirmation";
import Input from "components/Input/Input";

export default function Funcionario() {
  const [EmployeeData, setEmployeeData] = useState([]);
  const [openModalNewEmployee, setOpenModalNewEmployee] = useState(false);
  const [msgEmployee, setmsgEmployee] = "";
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [messageModalConfirm, setMessageModalConfirm] = useState("");
  const [openModalEditEmployee, setOpenModalEditEmployee] = useState(false);
  const [modalDataEditEmployee, setModalDataEditEmployee] = useState({});
  const [formNewEmployee, setformNewEmployee] = useState([]);





  useEffect(() => {
    listAllEmployee(); 
  }, []);

  useEffect(() => {
    listAllEmployee();
  }, [EmployeeData]);


  function listAllEmployee() {
    let condominiumId = JSON.parse(localStorage.getItem("id"));
    api
      .get(`/condominiums/employees/${condominiumId}`)
      .then((response) => {
        setEmployeeData(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //MODAL NEW EMPLOYEE

  function onChangeNewEmployee(event) {
    setformNewEmployee({
      ...formNewEmployee,
      [event.target.name]: event.target.value,
    });
  }

  function registeringNewEmployee() {
    setOpenModalNewEmployee(!openModalNewEmployee)
  }

  function closeModalPostEmployee(){
    setOpenModalNewEmployee(!openModalNewEmployee)
  }

  function validationsPostEmployee(){
    newEmployee()
  }

  function newEmployee(){
    let condominiumId = JSON.parse(localStorage.getItem("id"))
    api
      .post(
        `/condominiums/employees/${condominiumId}`,
        {
          email: formNewEmployee.email,
          fullName: formNewEmployee.fullName,
          phone: formNewEmployee.phone,
          gender: formNewEmployee.gender,
          office: formNewEmployee.office,
          cpf: formNewEmployee.cpf,
        }
      )
      .then((response) => {
        // setMsgResidents("Morador cadastrado com sucesso!");
        setOpenModalNewEmployee(!openModalNewEmployee)
      })
      .catch((error) => {
        console.log(error);
      });
  }

//MODAL CONFIRM
  function closeModalConfirm() {
    setOpenModalConfirm(!openModalConfirm);
  }

  function confirmDelete(employeeId, employeeName) {
    setOpenModalConfirm(!openModalConfirm);
    setMessageModalConfirm(`Deseja excluir o funcionário: ${employeeName}?`);
    sessionStorage.setItem("employeeId", employeeId);
  }

  function deleteUser() {
    let deleteEmployeeId = sessionStorage.getItem("employeeId");
      api
        .delete(`/condominiums/employees/${deleteEmployeeId}`)
        .then((response) => {
          sessionStorage.removeItem("employeeId");
          closeModalConfirm();
        })
        .catch((error) => {
          console.log(error); 
        });
    
  }

  // FUNCTIONS FROM PUT EMPLOYEE

  function onChangePutEmployee(field, data) {
    setModalDataEditEmployee({ ...modalDataEditEmployee, [field]: data });
  }

  function getEmployeeData(residentId) {
    api
      .get(`/condominiums/employees/id/${residentId}`)
      .then((response) => {
        setOpenModalEditEmployee(!openModalEditEmployee);
        setModalDataEditEmployee(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function closeModalPutEmployee() {
    setOpenModalEditEmployee(!openModalEditEmployee);
    setModalDataEditEmployee({});
    // setMsgResidents("");
  }

  function validationsEditEmployee() {
    putEmployee(modalDataEditEmployee.id);
  }

  function putEmployee(employeeId){
    api
      .put(`/condominiums/employees/${employeeId}`, {
        office: modalDataEditEmployee.office
      })
      .then((response) => {
        closeModalPutEmployee();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <div className="employee-background">
        <div className="headerSindico">
          <Header
            title="Funcionários"
            page1="Visão Geral"
            link1="/sindico-visao-geral"
            page2="Mural de Avisos"
            link2="/mural-de-avisos"
            page3="Áreas Comuns"
            link3="/areas-comuns"
            page4="Funcionários"
            link4="/funcionarios"
          />
        </div>
        <div className="register">
          <Button className={"btnAllVision"} click={() => registeringNewEmployee()}>Cadastrar Funcionário</Button>
        </div>
        <div className="employee-board">
          {EmployeeData?.map((employee, index) => (
            <Card
              key={employee.id}
              img={visit}
              name={employee.fullName}
              email={employee.office}
              edit={() => getEmployeeData(employee.id)}
              delete = {() => confirmDelete(employee.id, employee.fullName)}
            />
          ))}
        </div>
      </div>

      <Modal
        isOpen={openModalNewEmployee}
        setModalOpen={() => closeModalPostEmployee()}
        click={() => validationsPostEmployee()}
        nameButton={"Cadastrar"}
      >
        <div className="modal-resident">
          <Input
            label={"Nome:"}
            name={"fullName"}
            onChange={onChangeNewEmployee}
          />
          <Input
            label={"Email:"}
            name={"email"}
            onChange={onChangeNewEmployee}
          />
          <Input
            label={"Telefone:"}
            name={"phone"}
            onChange={onChangeNewEmployee}
          />
          <div className="gender">
            <div className="title">
              <label htmlFor="">Gênero:</label>
            </div>
            <select
              name="gender"
              id="select-gender"
              onChange={onChangeNewEmployee}
            >
              <option value=""></option>
              <option value="MASC">Masculino</option>
              <option value="FEME">Feminino</option>
            </select>
          </div>
          <Input
            label={"Cargo:"}
            name={"office"}
            onChange={onChangeNewEmployee}
          />
          <Input
            label={"CPF:"}
            name={"cpf"}
            onChange={onChangeNewEmployee}
          />
          
          <div className="msg-error">
            <p id="errorText">{msgEmployee}</p>
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

      {/* MODAL FROM EDIT EMPLOYEE */}

      <Modal
        isOpen={openModalEditEmployee}
        setModalOpen={() => closeModalPutEmployee()}
        click={() => validationsEditEmployee()}
        nameButton={"Cadastrar"}
      >
        <div className="modal-resident">
          <Input
            label={"Cargo:"}
            name={"office"}
            value={modalDataEditEmployee.office}
            onChange={(e) => onChangePutEmployee("office", e.target.value)}
          />
          <div className="msg-error">
            {/* <p id="errorText">{msgResidents}</p> */}
          </div>
        </div>
      </Modal>

    </>
  );
}
