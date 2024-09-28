import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { ROUTES } from "../../appConfig/routes";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import GenerateQRCode from "../../pages/GenerateQRCode";
import Error from "../../pages/Error";
import LogVisit from "../../pages/LogVisit";

const RoutesApp: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        {/*Redirecionar diretamente para a tela de login*/}
        <Route path="/" element={<Navigate to={ROUTES.LOGIN} />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />

        {/*Rotas protegidas*/}
        <Route path={ROUTES.GENERATE} element={<GenerateQRCode />} />
        <Route path={ROUTES.REGISTER().USER} element={<Register />} />
        <Route path={ROUTES.REGISTER().VISIT} element={<LogVisit />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </HashRouter>
  );
};

export default RoutesApp;
