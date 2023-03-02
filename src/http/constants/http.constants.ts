import https from 'https';
import { HttpModuleOptions } from '../interfaces/http.interfaces';
export const HTTP_MODULE_OPTIONS = 'HTTP_MODULE_OPTIONS';
export const AXIOS_INSTANCE_TOKEN = 'AXIOS_INSTANCE_TOKEN';
export const HTTP_MODULE_ID = 'HTTP_MODULE_ID';
export const selectedHeaders = ['Authorization', 'authorization'];
export const headers = {
  'Content-Type': 'application/json',
};
export const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
  requestCert: false,
});
export const defaultAxiosConfigInstance: HttpModuleOptions = {
  headers,
  httpsAgent,
};
export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  OPTIONS = 'OPTIONS',
  HEAD = 'HEAD',
  ALL = 'ALL',
}