export interface IUserData {
  usuario_id: number;
  login: string;
  nome: string;
  datacad: string;
  perfil: number;
}

export interface IAuthenticationService {
  signIn(email: string, password: string): Promise<IUserData>;
  getUserData(): Promise<IUserData>;
  logout(): Promise<void>;
}
