import { useState } from "react";
import ComponentWithError from "./components/ComponentWithError";
import RoutesApp from "./components/Routes";
import { AuthProvider } from "./contexts/AuthContext";
import { IoCProvider } from "./contexts/IoCContext";
import { SnackbarProvider } from "notistack";
import { ErrorBoundary } from "react-error-boundary";

const App: React.FC = () => {
  const [catchError, setCatchError] = useState({} as Error);

  return (
    <IoCProvider>
      <AuthProvider>
        <SnackbarProvider
          style={{ fontFamily: "Poppins" }}
          autoHideDuration={3000}
          preventDuplicate={true}
        >
          <ErrorBoundary
            fallback={<ComponentWithError error={catchError} />}
            onError={(error) => setCatchError(error)}
          >
            <RoutesApp />
          </ErrorBoundary>
        </SnackbarProvider>
      </AuthProvider>
    </IoCProvider>
  );
};

export default App;
