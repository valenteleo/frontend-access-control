import RoutesApp from "./components/Routes";
import { AuthProvider } from "./contexts/AuthContext";
import { IoCProvider } from "./contexts/IoCContext";
import { SnackbarProvider } from "notistack";

const App: React.FC = () => {
  return (
    <IoCProvider>
      <AuthProvider>
        <SnackbarProvider
          style={{ fontFamily: "Poppins" }}
          autoHideDuration={3000}
          preventDuplicate={true}
        >
          <RoutesApp />
        </SnackbarProvider>
      </AuthProvider>
    </IoCProvider>
  );
};

export default App;
