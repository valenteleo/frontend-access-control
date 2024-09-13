/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { injectable } from "inversify";
import { IHttpService } from "../models/IHttpService";
import Axios, { AxiosInstance } from "axios";
import appConfig from "../../../appConfig";

@injectable()
export class AxiosHttpService implements IHttpService {
  private httpInstance: AxiosInstance;

  constructor() {
    this.httpInstance = Axios.create({
      baseURL: appConfig.api.url,
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
    } catch (error) {
      throw error;
    }
  }

  public async get<T>(path: string, params?: {}): Promise<T> {
    return this.httpInstance
      .get(path, params)
      .then(({ data }) => data)
      .catch((err) => {
        throw err;
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
