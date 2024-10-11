import { inject, injectable } from "inversify";
import { IClientsVisit, IVisitsService } from "../models";
import { Types } from "../../../ioc/types";
import type { IHttpService } from "../../http/models/IHttpService";

@injectable()
export class VisitsService implements IVisitsService {
  @inject(Types.IHttpService) private httpInstance!: IHttpService;

  public async getScheduledVisits(
    id: number,
    minData: string,
    maxData: string,
    status: string
  ): Promise<IClientsVisit> {
    const response = await this.httpInstance.get(
      `/clientes?codusuario=${id}&datamin=${minData}&datamax=${maxData}&status=${status}`
    );

    return response;
  }

  public async updateVisitStatus(
    id: number,
    datavis: string
  ): Promise<IClientsVisit> {
    const response = await this.httpInstance.put(`/cliente/${id}`, {
      datavis: datavis,
      status: "cancelado",
    });

    return response;
  }
}
