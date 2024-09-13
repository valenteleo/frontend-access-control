import { Container } from "inversify";
import { Types } from "./types";

import { AxiosHttpService } from "../modules/http/implementations/AxiosHttpService";
import { IHttpService } from "../modules/http/models/IHttpService";

import { IQRCodeService } from "../modules/qrcode/models/IQRCodeService";
import { QRCodeService } from "../modules/qrcode/service/QRCodeService";

const appIocContainer = new Container({ defaultScope: "Singleton" });

appIocContainer.bind<IHttpService>(Types.IHttpService).to(AxiosHttpService);

appIocContainer
  .bind<IQRCodeService>(Types.QRCode.IQRCodeService)
  .to(QRCodeService);

export { appIocContainer };
