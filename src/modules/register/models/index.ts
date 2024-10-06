export interface IRegisterVisit {
  codusuario: number;
  codqr: string;
  nome: string;
  datavis: string;
  cpf: string;
}

export interface IRegisterUser {
  login: string;
  senha: string;
  nome: string;
  perfil: number;
}

export interface IRegisterVisitService {
  registerVisit(data: IRegisterVisit): Promise<IRegisterVisit>;
  registerUser(data: IRegisterUser): Promise<IRegisterUser>;
}
