import { HashRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "../../appConfig/routes";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Register from "../../pages/Register";

const RoutesApp: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
      </Routes>
    </HashRouter>
  );
};

export default RoutesApp;
