import { createContext, useContext } from "react";
import { interfaces } from "inversify";
import { appIocContainer } from "../ioc";

interface IIoCContext {
  serviceContainer: interfaces.Container;
}

const IoCContext = createContext<IIoCContext>({} as IIoCContext);

const IoCProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <IoCContext.Provider value={{ serviceContainer: appIocContainer }}>
      {children}
    </IoCContext.Provider>
  );
};

const useIoCContext = () => {
  const context = useContext(IoCContext);
  if (!Object.keys(context).length) {
    throw new Error("useIoCContext deve ser usado dentro de um IoCProvider.");
  }

  return context;
};

export { useIoCContext, IoCProvider };
