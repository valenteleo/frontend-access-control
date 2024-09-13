import RoutesApp from "./components/routes";
import { IoCProvider } from "./contexts/IoCContext";

const App: React.FC = () => {
  return (
    <IoCProvider>
      <RoutesApp />
    </IoCProvider>
  );
};

export default App;
