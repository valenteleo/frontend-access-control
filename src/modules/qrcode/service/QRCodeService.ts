import { injectable, inject } from "inversify";
import { IQRCode, IQRCodeService } from "../models/IQRCodeService";
import { Types } from "../../../ioc/types";
import type { IHttpService } from "../../http/models/IHttpService";

@injectable()
export class QRCodeService implements IQRCodeService {
  @inject(Types.IHttpService)
  private httpInstance!: IHttpService;

  public async generateQRCode(data: IQRCode): Promise<IQRCode> {
    return await this.httpInstance.post("/qr-code/generate", data);
  }

  public async getAnyone(): Promise<void> {
    return this.httpInstance.get("/qr-code/");
  }
}
