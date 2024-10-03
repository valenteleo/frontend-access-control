import { inject, injectable } from "inversify";
import { IClientsVisit, IVisitsService } from "../models";
import { Types } from "../../../ioc/types";
import type { IHttpService } from "../../http/models/IHttpService";

@injectable()
export class VisitsService implements IVisitsService {
  @inject(Types.IHttpService) private httpInstance!: IHttpService;

  public async getScheduledVisits(id: number): Promise<IClientsVisit> {
    const response = await this.httpInstance.get(
      `/clientes?codusuario=${id}`,
      {}
    );

    return response;
  }
}
