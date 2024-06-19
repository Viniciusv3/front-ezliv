import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../provider/axios";
import Card from "components/Card/Card"
import "./overviewcondominium.css"
import Header from "components/Header/Header";
import Button from "components/Button/Button";
import ModalConfirmation from "components/ModalConfirmation/ModalConfirmation";
import visit from "../../assets/visit.svg";
import EmptyState from "components/EmptyState/EmptyState";


export default function OverviewCondominium() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [messageModalConfirm, setMessageModalConfirm] = useState("");
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get("/condominiums");
        if (response.data.content.length) {
          setData(response.data.content);
        } else {
          setData([]);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [data]);

  function handleButtonClick () {
    navigate("/registrar-condominio");
  };

  function confirmDelete(condominiumId, condominiumName){
    setOpenModalConfirm(!openModalConfirm)
    setMessageModalConfirm(`Deseja desativar o condomínio ${condominiumName}?`)
    sessionStorage.setItem("deleteCondominiumId", condominiumId)
  }

  function deleteCondominium(){
    let deleteCondominiumId = sessionStorage.getItem("deleteCondominiumId")
    api
        .delete(`/condominiums/${deleteCondominiumId}`)
        .then((response) => {
          sessionStorage.removeItem("deleteCondominiumId");
          closeModalConfirm();
        })
        .catch((error) => {
          console.log(error);
        });
  }

  function closeModalConfirm(){
    setOpenModalConfirm(!openModalConfirm)

  }

  return (
    <>

      <div className="overview-background">
        <div className="header-overview">
          <Header
            title="Condomínios"
          />
        </div>
        <div className="overview-search">
          <Button className={"btnAllVision"} click={handleButtonClick}>
            Cadastrar Condomínio
          </Button>
        </div>
        <div className="overview-condominium">


          <div className="board-condominium">
            {
              data?.map((condominium) => (
                !condominium.active ? null :
                <Card
                  key={condominium.id}
                  img={visit}
                  name={condominium.name}
                  cpf={`${condominium.adress.adress} ${condominium.adress.number}`}
                  delete={() => confirmDelete(condominium.id, condominium.name)}
                ></Card>
              ))
            }
          </div>
        </div>
      </div>
      <ModalConfirmation
        isOpen={openModalConfirm}
        setModalOpen={() => closeModalConfirm()}
        message={messageModalConfirm}
        clickCancel={() => closeModalConfirm()}
        clickConfirm={() => deleteCondominium()}
      ></ModalConfirmation>
    </>
  );
}