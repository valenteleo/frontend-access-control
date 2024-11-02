import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { ROUTES } from "../../appConfig/routes";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import GenerateQRCode from "../../pages/GenerateQRCode";
import Error from "../../pages/Error";
import LogVisit from "../../pages/LogVisit";
import Home from "../../pages/Home";
import RouteGuard, { ProfilesDescription } from "./RouteGuard";
import Users from "../../pages/Users";

const RoutesApp: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        {/*Redirecionar diretamente para a tela de login e rotas públicas*/}
        <Route path="/" element={<Navigate to={ROUTES.LOGIN} />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />

        {/*Rotas protegidas*/}
        <Route
          path={ROUTES.HOME}
          element={
            <RouteGuard rules={ProfilesDescription.Admin}>
              <Home />
            </RouteGuard>
          }
        />

        <Route
          path={ROUTES.REGISTER().USER}
          element={
            <RouteGuard rules={ProfilesDescription.User}>
              <Register />
            </RouteGuard>
          }
        />

        <Route
          path={ROUTES.GENERATE}
          element={
            <RouteGuard rules={ProfilesDescription.Admin}>
              <GenerateQRCode />
            </RouteGuard>
          }
        />

        <Route
          path={ROUTES.REGISTER().VISIT}
          element={
            <RouteGuard rules={ProfilesDescription.Admin}>
              <LogVisit />
            </RouteGuard>
          }
        />

        <Route
          path={ROUTES.USERS}
          element={
            <RouteGuard rules={ProfilesDescription.User}>
              <Users />
            </RouteGuard>
          }
        />

        <Route path="*" element={<Error />} />
      </Routes>
    </HashRouter>
  );
};

export default RoutesApp;
