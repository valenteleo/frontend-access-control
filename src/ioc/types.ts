import { AuthenticationTypes } from "../modules/authentication/container";
import { QRCodeTypes } from "../modules/qrcode/container/types";
import { RegisterTypes } from "../modules/register/container";
import { UsersTypes } from "../modules/users/container";
import { VisitsTypes } from "../modules/visits/container";

export const Types = {
  IHttpService: Symbol("IHttpService"),
  QRCode: { ...QRCodeTypes },
  Authentication: { ...AuthenticationTypes },
  Visits: { ...VisitsTypes },
  Register: { ...RegisterTypes },
  Users: { ...UsersTypes },
};
