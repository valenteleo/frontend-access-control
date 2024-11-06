import { injectable } from "inversify";
import { IHttpService } from "../models/IHttpService";
import Axios, { AxiosInstance, AxiosError } from "axios";
import appConfig from "../../../appConfig";
import { AppError } from "../../../utils/AppError";

@injectable()
export class AxiosHttpService implements IHttpService {
  private httpInstance: AxiosInstance;

  constructor() {
    this.httpInstance = Axios.create({
      baseURL: appConfig.api.url,
      timeout: appConfig.api.timeout,
      withCredentials: true,
    });
  }

  private async makeRequest(
    method: string,
    path: string,
    body?: any,
    params?: {}
  ) {
    try {
      const { data } = await this.httpInstance.request({
        method: method,
        url: path,
        data: body,
        params: params,
      });
      return data;
    } catch (err: any) {
      const error: AxiosError<{ message: string }> = err;
      if (error.message.includes("timeout")) {
        throw new AppError("Tempo de conexão esgotado");
      }

      if (error.status === 401 && error.message.includes("token")) {
        throw new AppError("Token não encontrado");
      }
      throw new AppError(error.response?.data.message || error.message);
    }
  }

  public async get<T>(path: string, params?: {}): Promise<T> {
    return this.httpInstance
      .get(path, params)
      .then(({ data }) => data)
      .catch((err) => {
        const error: AxiosError<{ message: string }> = err;
        throw new AppError(error.response?.data.message || error.message);
      });
  }

  public async post<T>(path: string, body?: any, params?: {}): Promise<T> {
    return await this.makeRequest("POST", path, body, params);
  }

  public async put<T>(path: string, body?: any, params?: {}): Promise<T> {
    return await this.makeRequest("PUT", path, body, params);
  }

  public async patch<T>(path: string, body?: any, params?: {}): Promise<T> {
    return await this.makeRequest("PATCH", path, body, params);
  }

  public async delete<T>(path: string, params?: {}): Promise<T> {
    return await this.makeRequest("DELETE", path, undefined, params);
  }
}
