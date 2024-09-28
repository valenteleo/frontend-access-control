import RoutesApp from "./components/routes";
import { IoCProvider } from "./contexts/IoCContext";
import { SnackbarProvider } from "notistack";

const App: React.FC = () => {
  return (
    <SnackbarProvider autoHideDuration={3000} preventDuplicate={true}>
      <IoCProvider>
        <RoutesApp />
      </IoCProvider>
    </SnackbarProvider>
  );
};

export default App;
