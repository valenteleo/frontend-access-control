import { inject, injectable } from "inversify";
import {
  IRegisterUser,
  IRegisterVisit,
  IRegisterVisitService,
} from "../models";
import { Types } from "../../../ioc/types";
import type { IHttpService } from "../../http/models/IHttpService";

@injectable()
export class RegisterVisitService implements IRegisterVisitService {
  @inject(Types.IHttpService) private httpInstance!: IHttpService;

  public async registerVisit(data: IRegisterVisit): Promise<IRegisterVisit> {
    const response = await this.httpInstance.post("/cadcliente", data);

    return response;
  }

  public async registerUser(data: IRegisterUser): Promise<IRegisterUser> {
    const response = await this.httpInstance.post("/cadastro", data);

    return response;
  }
}
