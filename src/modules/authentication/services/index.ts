import { inject, injectable } from "inversify";
import { IAuthenticationService, IUserData } from "../models";
import { Types } from "../../../ioc/types";
import type { IHttpService } from "../../http/models/IHttpService";

@injectable()
export class AutheticationService implements IAuthenticationService {
  @inject(Types.IHttpService) private httpInstance!: IHttpService;

  public async signIn(email: string, password: string): Promise<IUserData> {
    const data = { login: email, senha: password };
    const response = await this.httpInstance.post<IUserData>("/login", data);

    return response;
  }

  public async getUserData(): Promise<IUserData> {
    const response = await this.httpInstance.get<IUserData>("/usuario");

    return response;
  }

  public async logout(): Promise<void> {
    const response = await this.httpInstance.post("/logout");

    return response;
  }
}
