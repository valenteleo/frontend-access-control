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

export interface GenericsVisit {
  id: string | number;
  minData: string;
  maxData: string;
  status: string;
  user: string;
}

export interface IVisitsService {
  getScheduledVisits(data: GenericsVisit): Promise<IClientsVisit>;
  getScheduledById(id: number): Promise<ScheduledVisits>;
  cancelVisit(id: number): Promise<IClientsVisit>;
  updateDateVisit(id: number, date: string): Promise<IClientsVisit>;
  downloadReport(data: GenericsVisit): Promise<Blob>;
}
