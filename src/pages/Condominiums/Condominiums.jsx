import { api } from "provider/axios";
import React, { useEffect, useState } from "react";
import "./condominium.css";
import Header from "../../components/Header/Header";
import CardCondominium from "./components/CardCondominium";
import Loading from "components/Loading/Loading";
import EmptyState from "components/EmptyState/EmptyState";
import Button from "../../components/Button/Button";
import { FaDownload } from 'react-icons/fa';


export default function Condominiums() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
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

      setLoading(false);
    }

    fetchData();
  }, [data]);

  if (loading) {
    return <Loading></Loading>;
  }

  if (data.length === 0) {
    return (
      <>
        <Header></Header>
        <EmptyState
          text={"Não foi possível encontrar nenhum condomínio cadastrado."}
        ></EmptyState>
      </>
    );
  }

  function downloadList(){
    api.get("/condominiums/download-list");
  }

  return (
    <>
      <Header></Header>
      <div className="top">
        <div className="title">
      <h1>Condomínios</h1>
        </div>
        <div className="button">
      <Button className={"btnPrimary"} click={downloadList}>
      <FaDownload />
      </Button>
        </div>
      </div>
      <div className="condominiumsArea">
        {data.map((condominium) => (
          <CardCondominium
            key={condominium.id}
            name={condominium.name}
            adress={`${condominium.adress.adress} ${condominium.adress.number}`}
            district={condominium.adress.district}
          ></CardCondominium>
        ))}
      </div>
    </>
  );
}
