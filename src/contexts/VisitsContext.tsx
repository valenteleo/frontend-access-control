import React, { createContext, useContext, useState } from "react";

interface UsersOptions {
  value: string | number;
  label: string;
}

interface IVisitsContext {
  usersOption: UsersOptions[];
  setUsersOptions: React.Dispatch<React.SetStateAction<UsersOptions[]>>;
}

const VisitsContext = createContext<IVisitsContext | undefined>(
  {} as IVisitsContext
);

export const VisitsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [usersOption, setUsersOptions] = useState<UsersOptions[]>([]);

  return (
    <VisitsContext.Provider value={{ usersOption, setUsersOptions }}>
      {children}
    </VisitsContext.Provider>
  );
};

export const useVisits = (): IVisitsContext => {
  const context = useContext(VisitsContext);

  if (!context) {
    throw new Error("useVisits deve ser usado dentro de um VisitsProvider");
  }

  return context;
};
