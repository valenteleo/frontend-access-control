import { HashRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "../../appConfig/routes";
import Home from "../../pages/Home";

const RoutesApp: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
      </Routes>
    </HashRouter>
  );
};

export default RoutesApp;
