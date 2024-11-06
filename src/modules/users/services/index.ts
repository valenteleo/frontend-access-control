import { inject, injectable } from "inversify";
import { IAllUsers, IUsersService } from "../models";
import { Types } from "../../../ioc/types";
import { type IHttpService } from "../../http/models/IHttpService";
import { IUserData } from "../../authentication/models";

@injectable()
export class UsersService implements IUsersService {
  @inject(Types.IHttpService) private httpInstance!: IHttpService;

  public async getAllUsers(): Promise<IAllUsers> {
    const response = await this.httpInstance.get<IAllUsers>("/users");

    return response;
  }

  public async changePassword(
    idx: number,
    newPassword: string
  ): Promise<IUserData> {
    const response = await this.httpInstance.put<IUserData>(`/usuario/${idx}`, {
      senha: newPassword,
    });

    return response;
  }

  public async deleteUser(idx: number): Promise<IUserData> {
    const response = await this.httpInstance.delete<IUserData>(
      `/usuario/${idx}`
    );

    return response;
  }
}
