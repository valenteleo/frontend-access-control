import { QRCodeTypes } from "../modules/qrcode/container/types";

export const Types = {
  IHttpService: Symbol("IHttpService"),
  QRCode: { ...QRCodeTypes },
};
