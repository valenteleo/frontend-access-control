export interface IClientsQRCode {
  clientes: IQRCode[];
}
export interface IQRCode {
  nome: string;
  codqr: string;
}

export interface IQRCodeService {
  getListQRCode(codusuario?: string | number): Promise<IClientsQRCode>;
  downloadQRCode(userID: string): Promise<Blob>;
}
