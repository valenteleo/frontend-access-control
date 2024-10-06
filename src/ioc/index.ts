import { Container } from "inversify";
import { Types } from "./types";

import { AxiosHttpService } from "../modules/http/implementations/AxiosHttpService";
import { IHttpService } from "../modules/http/models/IHttpService";

import { IQRCodeService } from "../modules/qrcode/models/IQRCodeService";
import { QRCodeService } from "../modules/qrcode/service/QRCodeService";

import { AutheticationService } from "../modules/authentication/services";
import { IAuthenticationService } from "../modules/authentication/models";

import { IVisitsService } from "../modules/visits/models";
import { VisitsService } from "../modules/visits/services";

import { IRegisterVisitService } from "../modules/register/models";
import { RegisterVisitService } from "../modules/register/services";

const appIocContainer = new Container({ defaultScope: "Singleton" });

appIocContainer.bind<IHttpService>(Types.IHttpService).to(AxiosHttpService);

appIocContainer
  .bind<IQRCodeService>(Types.QRCode.IQRCodeService)
  .to(QRCodeService);

appIocContainer
  .bind<IAuthenticationService>(Types.Authentication.IAuthenticationService)
  .to(AutheticationService);

appIocContainer
  .bind<IVisitsService>(Types.Visits.IVisitsService)
  .to(VisitsService);

appIocContainer
  .bind<IRegisterVisitService>(Types.Register.IRegisterVisitService)
  .to(RegisterVisitService);

export { appIocContainer };
