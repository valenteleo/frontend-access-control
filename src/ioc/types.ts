import { AuthenticationTypes } from "../modules/authentication/container";
import { QRCodeTypes } from "../modules/qrcode/container/types";
import { VisitsTypes } from "../modules/visits/container";

export const Types = {
  IHttpService: Symbol("IHttpService"),
  QRCode: { ...QRCodeTypes },
  Authentication: { ...AuthenticationTypes },
  Visits: { ...VisitsTypes },
};
