import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { AuthProvider } from "provider/AuthContext";
import ChangePassword from "pages/ChangePassword/ChangePassword";
import BulletinBoard from "pages/BulletinBoard/BulletinBoard";
import MyReceived from "pages/MyReceived/MyReceived";
import OverviewCondominium from "pages/OverViewCondominium/OverviewCondominium";
import CondominiumRegister from "pages/CondominiumRegister/CondominiumRegister";
import MyReserve from "pages/MyReserve/MyReserve";
import MyApartment from "pages/MyApartment/MyApartment";
import Employee from "pages/Employee/Employee";
import Delivery from "pages/Delivery/Delivery";
import CommonAreas from "pages/CommonAreas/CommonAreas";
import Syndicboard from "pages/Syndic/SyndicBoard";
import Payments from "pages/Payments/Payments";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/change-password" element={<ChangePassword />}></Route>
          <Route path="/mural-de-avisos" element={<BulletinBoard />}></Route>
          <Route path="/meus-recebidos" element={<MyReceived/>}></Route>
          <Route path="/meu-apartamento" element={<MyApartment/>}></Route>
          <Route path="/condominios" element={<OverviewCondominium />}></Route>
          <Route path="/reservas" element={<MyReserve />}></Route>
          <Route path="/funcionarios" element={<Employee />}></Route>
          <Route path="/sindico-visao-geral" element={<Syndicboard />} ></Route>
          <Route path="/registrar-condominio" element={<CondominiumRegister />}></Route>
          <Route path="/entregas" element={<Delivery />}></Route>
          <Route path="/areas-comuns" element={<CommonAreas />}></Route>
          <Route path="/contas" element={<Payments/>}></Route>
          <Route path="*" element={<h1>Error</h1>}></Route>
          
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
