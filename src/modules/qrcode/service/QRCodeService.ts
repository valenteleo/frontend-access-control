import { injectable, inject } from "inversify";
import { IClientsQRCode, IQRCodeService } from "../models/IQRCodeService";
import { Types } from "../../../ioc/types";
import type { IHttpService } from "../../http/models/IHttpService";

@injectable()
export class QRCodeService implements IQRCodeService {
  @inject(Types.IHttpService)
  private httpInstance!: IHttpService;

  public async getListQRCode(
    codusuario?: string | number
  ): Promise<IClientsQRCode> {
    const response = await this.httpInstance.get<IClientsQRCode>(
      `/status?codusuario=${codusuario}`
    );
    return response;
  }

  public async downloadQRCode(userID: string): Promise<Blob> {
    const response = await this.httpInstance.post<Blob>(
      `/qr-code/${userID}`,
      {},
      {},
      "blob"
    );

    return response;
  }
}
