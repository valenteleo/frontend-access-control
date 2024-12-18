import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import React, { PropsWithChildren } from "react";

export enum ProfilesDescription {
  Admin = 0,
  User = 1,
}

export enum Descriptions {
  "Administrador",
  "Usuário Comum",
}

type Profiles = 0 | 1;

interface RouteGuardProps extends PropsWithChildren {
  children: React.ReactNode;
  rules: Profiles;
}

const RouteGuard: React.FC<RouteGuardProps> = ({
  children,
  rules,
}: RouteGuardProps) => {
  const { isAuthenticated, userData } = useAuth();
  const isAdmin = userData.perfil === ProfilesDescription.Admin;
  const isAuthorized = rules !== userData.perfil || isAdmin;

  return isAuthenticated && isAuthorized ? children : <Navigate to="/" />;
};

export default RouteGuard;
