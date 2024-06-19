import React, { useEffect, useState } from "react";
import "./payments.css"
import Header from "components/Header/Header";
import Input from "components/Input/Input";
import Modal from "components/Modal/Modal";
import Button from "components/Button/Button";
import { CircularProgress } from "@mui/material";
import CardPayment from "components/CardPayment/CardPayment";
import raio from "../../assets/relampago.png"
import { api } from "../../provider/axios";

export default function Delivery() {

  const [isVisible, setIsVisible] = useState(true);
  const [loginData, setLoginData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dataApi, setDataApi] = useState([]);
  const [msg, setMsg] = useState([]);

  function callApi() {
    api.post(`/bills/electricity`, {
      email: loginData.paymentsEmail,
      password: loginData.paymentsPassword
    })
      .then((response) => {
        setDataApi(response.data);
        setIsLoading(false);
        setIsVisible(!isVisible)
      })
      .catch((error) => {
        setIsLoading(false);
        setMsg("Preencha corretamente os campos.")
      });
  }

  const toggleVisibility = () => {
    setIsLoading(true);
    setMsg("")
    callApi()
  };

  function onChangeLogin(event) {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  }

  function goToPaymentPDF(link) {
    window.open(link, '_blank');
  }


  return (
    <>
      <div className="payments-backgorund">
        <div className="payments-header">
          <Header
            condominium={localStorage.getItem("condominiumName")}
            title="Contas"
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
        <div className="background-login-payments" style={{ display: isVisible ? 'flex' : 'none' }}>
          <div className="box-login-payments">
            <div className="title-login-payments">
              <span>Busque por suas contas de energia.</span>
            </div>
            <div className="content-login-payments">
              <Input
                label={"Email:"}
                name={"paymentsEmail"}
                onChange={onChangeLogin}
              />
              <Input
                label={"Senha:"}
                name={"paymentsPassword"}
                type={"password"}
                onChange={onChangeLogin}
              />
              <div className="msg-error">
                <p id="errorText">{msg}</p>
              </div>
              <div className="action-login-payments">
                {
                  isLoading ? <CircularProgress className="loading" size={40} /> :
                    <Button
                      className={"btnHeaderHome"}
                      click={toggleVisibility}>
                      Buscar
                    </Button>}
              </div>
            </div>
          </div>
        </div>

        <div className="backgoround-show-payments" style={{ display: !isVisible ? 'flex' : 'none' }}>
          <div className="content-show-payments">
            {dataApi?.slice().reverse().map((payment) => (
              <CardPayment
                key={payment.barCode}
                img={raio}
                status={payment.invoiceStatus}
                valor={payment.amount}
                mes_referencia={payment.monthReference}
                vencimento={payment.billDueDate}
                view={() => goToPaymentPDF(payment.archiveUrl)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
