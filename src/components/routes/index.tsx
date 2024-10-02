import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { ROUTES } from "../../appConfig/routes";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import GenerateQRCode from "../../pages/GenerateQRCode";
import Error from "../../pages/Error";
import LogVisit from "../../pages/LogVisit";
import Home from "../../pages/Home";
import RouteGuard from "./RouteGuard";

const RoutesApp: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        {/*Redirecionar diretamente para a tela de login e rotas públicas*/}
        <Route path="/" element={<Navigate to={ROUTES.LOGIN} />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />

        <Route path={ROUTES.GENERATE} element={<GenerateQRCode />} />

        {/*Rotas protegidas*/}
        <Route
          path={ROUTES.HOME}
          element={
            <RouteGuard>
              <Home />
            </RouteGuard>
          }
        />

        <Route
          path={ROUTES.REGISTER().USER}
          element={
            <RouteGuard>
              <Register />
            </RouteGuard>
          }
        />
        <Route
          path={ROUTES.REGISTER().VISIT}
          element={
            <RouteGuard>
              <LogVisit />
            </RouteGuard>
          }
        />

        <Route path="*" element={<Error />} />
      </Routes>
    </HashRouter>
  );
};

export default RoutesApp;
