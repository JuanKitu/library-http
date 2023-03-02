import { Inject, Injectable } from '@nestjs/common';
import {
  AXIOS_INSTANCE_TOKEN, HTTP_MODULE_OPTIONS,
  RequestMethod,
  selectedHeaders,
} from '../constants/http.constants';
import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import _ from 'lodash';
import { STARTER_CONFIG } from '../../constants/constants';

@Injectable()
export class HttpService {
  private headers: any;
  constructor(
    @Inject(AXIOS_INSTANCE_TOKEN)
    private readonly _instance: AxiosInstance = Axios,
    @Inject(HTTP_MODULE_OPTIONS)
    private readonly config
  ) {
    console.log('Esta es mi configuración de http XD: ',this.config);
  }
  get axiosRef(): AxiosInstance {
    return this._instance;
  }
  public initAxios(headers: any) {
    this.headers = headers;
  }
  private fetch = async <T = any>(
    url: string,
    config: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => {
    try {
      config = _.omit(config, ['url', 'method']);
      config.headers = _.merge(
        _.pick(this.headers, selectedHeaders),
        config.headers,
      );
      return await this.axiosRef.request({
        url: encodeURI(url),
        ...config,
      });
    } catch (err) {
      throw err;
    }
  };
  public get = async <T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => {
    return this.fetch(url, { ...config, method: RequestMethod.GET });
  };
  public post = async <T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => {
    return this.fetch(url, { ...config, method: RequestMethod.POST });
  };
  public put = async <T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => {
    return this.fetch(url, { ...config, method: RequestMethod.PUT });
  };
  public patch = async <T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => {
    return this.fetch(url, { ...config, method: RequestMethod.PATCH });
  };
  public delete = async <T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => {
    return this.fetch(url, { ...config, method: RequestMethod.DELETE });
  };
  public options = async <T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => {
    return this.fetch(url, { ...config, method: RequestMethod.OPTIONS });
  };
  public head = async <T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => {
    return this.fetch(url, { ...config, method: RequestMethod.HEAD });
  };
}
