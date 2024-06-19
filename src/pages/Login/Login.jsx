import React from "react";
import "./login.css";
import loginBanner from "../../assets/loginBanner.svg";
import logo from "../../assets/logoBlack.svg";
import { api } from "provider/axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import ModalError from "components/ModalError/ModalError";
import { BiSolidMessageSquareError } from "react-icons/bi";



export default function Login() {

  const navigate = useNavigate();
  const [form, setForm] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const element = document.querySelector('.errorText');

  async function handleLogin(event) {
    setIsLoading(true);
    event.preventDefault();

    try {
      const {
        data: { token, role, firstLoginAlreadyDone, id },
      } = await api.post("/users/authenticate", {
        email: form.email,
        password: form.password,
      });


      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("role", JSON.stringify(role));
      localStorage.setItem("id", JSON.stringify(id));
      localStorage.setItem("firstLogin", JSON.stringify(firstLoginAlreadyDone))

      api.defaults.headers.Authorization = `Bearer ${token}`;

      if (!firstLoginAlreadyDone) {
        navigate("/change-password")
      }
      else {
        if (role === "ADM") {
          navigate("/condominios");
        }
        if (role === "RESIDENT") {
          api
            .get(`/condominiums/towers/apartments/residents/${id}`)
            .then((response) => {
              localStorage.setItem("condominiumName", response.data.condominiumName)
              localStorage.setItem("condominiumId", response.data.condominiumId)
              console.log(response.data.condominiumId)
            })
            .catch((error) => {
              console.log(error);
            });
          navigate("/mural-de-avisos")
        }
        if (role === "CONDOMINIUM") {
          api
            .get(`/condominiums/${id}`)
            .then((response) => {
              localStorage.setItem("condominiumName", response.data.name)
            })
            .catch((error) => {
              console.log(error);
            });
          navigate("/sindico-visao-geral")
        }
        if (role === "FACILITIES") {
          api
            .get(`/condominiums/employees/id/${id}`)
            .then((response) => {
              localStorage.setItem("condominiumName", response.data.name)
              localStorage.setItem("condominiumId", response.data.condominiumId)
            })
            .catch((error) => {
              console.log(error);
            });
          navigate("/sindico-visao-geral")
        }
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      
      setIsOpen(true);
    }
  }

  function onChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  function goHome() {
    navigate("/")
  }

  return (
    <>
      <div className="backgorund">
        <div className="container">
          <div className="banner">
            <div className="title">
              <p>Gestão com tecnologia para o seu condomínio</p>
            </div>
            <div className="image">
              <img src={loginBanner} alt="" />
            </div>
          </div>
          <div className="login">
            <div className="boxLogin">
              <div className="logo">
                <img src={logo} alt="" onClick={goHome} />
              </div>
              <div className="form">
                <Input
                  name={"email"}
                  type={"text"}
                  placeholder={"email@email.com"}
                  label={"Email:"}
                  onChange={onChange}
                ></Input>
                <Input
                  name={"password"}
                  type={"password"}
                  placeholder={"Insira sua senha"}
                  label={"Senha:"}
                  onChange={onChange}
                ></Input>
              </div>
              <span className="errorText">Usuário/senha inválidos!</span>
              <div className="action">
                {
                  isLoading ? <CircularProgress className="loading" size={40} /> :
                    <Button className={"btnPrimary"} click={handleLogin}>
                      Entrar
                    </Button>

                }
              </div>
            </div>
            <div className="footerLogin">
              <p>contato@ezliv.com.br</p>
              <p>(11) 4002-8922</p>
              <p>2023 ; todos os direitos reservados By EasyLiv</p>
            </div>
          </div>
        </div>
      </div>
      <ModalError isOpen={isOpen} setOpenModal={() => setIsOpen(!isOpen)}>
        <BiSolidMessageSquareError style={{fontSize: '70px', color : 'red'}}/>
        <Box style={{height: '20px'}}></Box>
        <p style={{fontSize: '16px', fontWeight: '500'}}>Oops! Algo deu errado ao realizar o login. Verifique seu login e senha e tente novamente.</p>
      </ModalError>
    </>
  )
}