import "../Login/login.css";
import Input from "../../components/Input/Input";
import logo from "../../assets/logoBlack.svg";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../../provider/axios"
import { CircularProgress } from "@mui/material";
import loginBanner from "../../assets/loginBanner.svg";


export default function ChangePassword() {
  const navigate = useNavigate();
  const [form, setForm] = useState([]);
  const [isLoading, setIsLoading] = useState(false);



  function onChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handlePasswordChange() {
    try {
      const id = JSON.parse(localStorage.getItem("id"));
      const role = JSON.parse(localStorage.getItem("role"));
      const firstLogin = JSON.parse(localStorage.getItem("firstLogin"));

      if (firstLogin != null && !firstLogin) {
        var response = await api.put(`/users/first-login/${id}`, {
          newPassword: form.newPassword,
        });

        localStorage.clear("firstLogin")
        navigate("/login")
        console.log("Senha alterada com sucesso!")
      }
      else {
        console.log("Primeiro Login já realizado...")
      }
    } catch (error) {
      console.log("Não foi possível alterar a senha" + error);
    }
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
                  name={"newPassword"}
                  type={"password"}
                  placeholder={"Insira sua nova senha"}
                  label={"Nova Senha:"}
                  onChange={onChange}
                ></Input>
                <Input
                  name={"confirmPassword"}
                  type={"password"}
                  placeholder={"Confirme sua senha"}
                  label={"Confirmação"}
                  onChange={onChange}
                ></Input>
              </div>
              <span className="errorText">Usuário/senha inválidos!</span>
              <div className="action">
                {
                  isLoading ? <CircularProgress className="loading" size={40} /> :
                    <Button className={"btnPrimary"} click={handlePasswordChange}>
                      Cadastrar
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
    </>
  );
}
