import { inject, injectable } from "inversify";
import {
  GenericsVisit,
  IClientsVisit,
  IVisitsService,
  ScheduledVisits,
} from "../models";
import { Types } from "../../../ioc/types";
import type { IHttpService } from "../../http/models/IHttpService";

@injectable()
export class VisitsService implements IVisitsService {
  @inject(Types.IHttpService) private httpInstance!: IHttpService;

  public async getScheduledVisits(data: GenericsVisit): Promise<IClientsVisit> {
    const response = await this.httpInstance.get(
      `/clientes?codusuario=${data.id}&datamin=${data.minData}&datamax=${data.maxData}&status=${data.status}`
    );

    return response;
  }

  public async getScheduledById(id: number): Promise<ScheduledVisits> {
    const response = await this.httpInstance.get<ScheduledVisits>(
      `/cliente/${id}`
    );

    return response;
  }

  public async cancelVisit(id: number): Promise<IClientsVisit> {
    const response = await this.httpInstance.put(`/cancellation/${id}`, {
      status: "cancelado",
    });

    return response;
  }

  public async updateDateVisit(
    id: number,
    date: string
  ): Promise<IClientsVisit> {
    const response = await this.httpInstance.put<IClientsVisit>(
      `/cliente/${id}`,
      {
        datavis: date,
      }
    );

    return response;
  }

  public async downloadReport(data: GenericsVisit): Promise<Blob> {
    const response = await this.httpInstance.get<Blob>(
      `/clientes/download?codusuario=${data.id}&datamin=${data.minData}&datamax=${data.maxData}&status=${data.status}`,
      {
        responseType: "blob",
      }
    );

    return response;
  }
}
