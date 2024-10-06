export interface IClientsVisit {
  clientes: ScheduledVisits[];
}

export interface ScheduledVisits {
  cliente_id: number;
  nome: string;
  cpf: string;
  datager: string;
  datavis: string;
  codqr: string;
  dataaut: null;
  codusuario: number;
  status: string;
  usercad: string;
}

export interface IVisitsService {
  getScheduledVisits(
    id: number,
    minData: string,
    maxData: string,
    status: string
  ): Promise<IClientsVisit>;
}
