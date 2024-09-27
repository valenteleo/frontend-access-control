import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { ROUTES } from "../../appConfig/routes";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import Error from "../../pages/Error";

const RoutesApp: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        {/*Redirecionar diretamente para a tela de login*/}
        <Route path="/" element={<Navigate to={ROUTES.LOGIN} />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />

        {/*Rotas protegidas*/}
        <Route path={ROUTES.VISIT} element={<Home />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </HashRouter>
  );
};

export default RoutesApp;
