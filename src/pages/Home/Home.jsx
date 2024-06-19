import './home.css'
import React from "react";
import encomendas from "../../assets/encomendas.svg"
import gerenciamento from "../../assets/gerenciamento.svg"
import reservas from "../../assets/reservas.svg"
import muralAvisos from "../../assets/muralAvisos.svg"
import banner from "../../assets/bannerBuilding.svg"
import AdvantageRight from './components/Advantage/AdvantageRight/AdvantageRight';
import AdvantageLeft from './components/Advantage/AdvantageLeft/AdvantageLeft';
import Header from './components/Header/Header';
import contactUs from '../../assets/contactUs.svg'
import Contact from './components/Contact/Contact';
import logo from '../../assets/logo.svg';
import redes from '../../assets/redes.svg'
import AppleStore from "../../assets/logo-apple-store.svg"
import PlayStore from "../../assets/icon-play-store.svg"
import Mobile from "../../assets/celular.svg"
import { useNavigate } from "react-router-dom";


export default function Home() {
  const navigate = useNavigate();

  function goHome() {
    navigate("/")
  }

  function goLogin() {
    navigate("/login")
  }

  return (
    <>
      <Header clickLogo={() => goHome()} click={() => goLogin()}></Header>
      <div className="banner">
        <div className="container">
          <h1>Gestão e tecnologia para o seu condomínio</h1>
        </div>
        <div className="image">
          <img src={banner} alt="" />
        </div>
        <div className="title-vantagens">
          <span className='vantagem'>Vantagens</span>
        </div>
      </div>
      <div className="advantages">
        <div className="container">
          <div className="content">
            <AdvantageRight
              img={encomendas}
              title="Encomendas"
              text="Receba notificações, veja as informações e prazo para retirada de suas encomendas no local pré estabelecido"
            />
            <AdvantageLeft
              img={gerenciamento}
              title="Gerenciamento"
              text="Faça alterações e gerenciamento de forma personalizada com nossa ferramenta"
            />
            <AdvantageRight
              img={reservas}
              title="Reservas"
              text="Verifique a disponibilidade e faça reserva das áreas comuns  de seu condomínio  "
            />
            <AdvantageLeft
              img={muralAvisos}
              title="Mural de avisos"
              text="Quadro feito para informações gerais sobre festas no condomínio, datas de reuniões, manutenções das áreas comuns "
            />
          </div>
        </div>
      </div>

      <div className="background-container-phone-body-top">
        <div className="container-phone-body-top"></div>
      </div>
      <div className="container-phone">
        <div className="container-phone-body">
          <div className="background-about">
            <div className="container">
              <div className="container4">
                <div className="box-1-c4">
                  <div className="tittle-c4">
                    <div className="box-text">VOCÊ PODERÁ </div>
                    <div className="box-text">BAIXAR NOSSO</div>
                    <div className="box-text">APP EM BREVE!</div>
                  </div>

                  <div className="text-c4">
                    <div className="box-text">Nossa Aplicação mobile estará</div>
                    <div className="box-text">disponivel nas lojas de aplicativos</div>
                    <div className="box-text">android e IOS a partir de 2024.</div>
                  </div>

                  <div className="icons-c4">

                    <div className="box-icon">
                      <div className="icon1-c4-1"><img src={PlayStore} alt="" width="32px" style={{ paddingTop: "2px", paddingRight: "10px" }} /></div>
                      <div className="text-icon-c4">
                        <div className="text-icon-c4-1">Baixe no</div>
                        <div className="text-icon-c4-2">Google Play</div>
                      </div>
                    </div>

                    <div className="box-icon">
                      <div className="icon1-c4-2"><img src={AppleStore} alt="" width="37px"
                        style={{ paddingTop: "6px", paddingRight: "10px" }} /></div>
                      <div className="text-icon-c4">
                        <div className="text-icon-c4-1">Baixe na</div>
                        <div className="text-icon-c4-2">Apple Store</div>
                      </div>
                    </div>

                  </div>

                </div>
                <div className="box-2-c4">
                  <div className="box-img-mobile-ref"><img src={Mobile} alt="" />
                  </div>
                </div>


              </div>

            </div>
          </div>
        </div>
      </div>
      <div className="background-container-phone-body-bottom">
        <div className="container-phone-body-bottom"></div>
      </div>

      <div className="background-final">
        <div className="container">
          <div className="interested">
            <div className="title">
              Se Interessou?
            </div>
            <div className="contact">
              <div className="image">
                <img src={contactUs} alt="" />
              </div>
              <div className="contact-us">
                <Contact></Contact>
              </div>
            </div>
          </div>
        </div>

        <div className="footer">
          <div className="footer-infos">
            <div className='sub-footer-1'><img src={redes} alt="" width="320px" /></div>
            <div className="sub-footer-2"><img src={logo} alt="" width="125px" /></div>
          </div>
          <div className="footer-business"> &copy; 2024 developed by EzLiv Team. All rights reserved</div>
        </div>
      </div>
    </>
  );
}