import { CreateAxiosDefaults } from 'axios';
import { IAxiosRetryConfig } from 'axios-retry';
import { ModuleMetadata, Provider, Type } from '@nestjs/common';

export type HttpModuleOptions = CreateAxiosDefaults & IAxiosRetryConfig;
export interface HttpModuleOptionsFactory {
  createHttpOptions(): Promise<HttpModuleOptions> | HttpModuleOptions;
}

export interface HttpModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useClass?: Type<HttpModuleOptionsFactory>;
  useExisting?: Type<HttpModuleOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<HttpModuleOptions> | HttpModuleOptions;
  inject?: any[];
  extraProviders?: Provider[];
}
