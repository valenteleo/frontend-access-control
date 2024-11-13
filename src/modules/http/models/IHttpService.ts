import { ResponseType } from "axios";

export interface IHttpService {
  get<T = any>(path: string, params?: {}): Promise<T>;
  post<T = any>(
    path: string,
    body?: any,
    params?: {},
    responseType?: ResponseType
  ): Promise<T>;
  put<T = any>(path: string, body?: any, params?: {}): Promise<T>;
  patch<T = any>(path: string, body?: any, params?: {}): Promise<T>;
  delete<T = any>(path: string, params?: {}): Promise<T>;
}
