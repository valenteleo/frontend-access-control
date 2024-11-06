import { IUserData } from "../../authentication/models";

export interface IAllUsers {
  Users: IUserData[];
}

export interface IUsersService {
  getAllUsers(): Promise<IAllUsers>;
  changePassword(idx: number, newPassword: string): Promise<IUserData>;
  deleteUser(idx: number): Promise<IUserData>;
}
