export interface IQRCode {
  qrcode: string;
}

export interface IQRCodeService {
  getAnyone: () => Promise<void>;
  generateQRCode: (data: IQRCode) => Promise<IQRCode>;
}
