import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { HttpService } from './services/http.service';
import {
  AXIOS_INSTANCE_TOKEN,
  defaultAxiosConfigInstance,
  HTTP_MODULE_ID,
  HTTP_MODULE_OPTIONS,
} from './constants/http.constants';
import Axios from 'axios';
import { HttpModuleAsyncOptions, HttpModuleOptions, HttpModuleOptionsFactory } from './interfaces/http.interfaces';
import _ from 'lodash';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { ConfigService } from '@nestjs/config';

const createAxiosRetry = (config: HttpModuleOptions) => {
  const axiosInstanceConfig: HttpModuleOptions = {
    ..._.merge(defaultAxiosConfigInstance, config),
  };
  return Axios.create(axiosInstanceConfig);
};
@Global()
@Module({
  providers: [
    HttpService,
    {
      provide: AXIOS_INSTANCE_TOKEN,
      useFactory: (config: HttpModuleOptions) => createAxiosRetry(config),
      inject: [HTTP_MODULE_OPTIONS],
    },
    {
      provide: HTTP_MODULE_OPTIONS,
      useFactory: (config: ConfigService) => config.get('config.http'),
      inject: [ConfigService],
    },
  ],
  exports: [HttpService, AXIOS_INSTANCE_TOKEN, HTTP_MODULE_OPTIONS],
})
export class HttpModule {
  static register(config: HttpModuleOptions): DynamicModule {
    return {
      global: true,
      module: HttpModule,
      providers: [
        {
          provide: AXIOS_INSTANCE_TOKEN,
          useValue: createAxiosRetry(config),
        },
        {
          provide: HTTP_MODULE_ID,
          useValue: randomStringGenerator(),
        },
      ],
    };
  }

  static registerAsync(options: HttpModuleAsyncOptions): DynamicModule {
    return {
      global: true,
      module: HttpModule,
      imports: options.imports,
      providers: [
        ...this.createAsyncProviders(options),
        {
          provide: AXIOS_INSTANCE_TOKEN,
          useFactory: (config: HttpModuleOptions) => createAxiosRetry(config),
          inject: [HTTP_MODULE_OPTIONS],
        },
        {
          provide: HTTP_MODULE_ID,
          useValue: randomStringGenerator(),
        },
        ...(options.extraProviders || []),
      ],
    };
  }
  private static createAsyncProviders(
    options: HttpModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProviders(options)];
    }
    const providers = [this.createAsyncOptionsProviders(options)];
    if (options.useClass)
      providers.push({
        provide: options.useClass,
        useClass: options.useClass,
      });
    return providers;
  }
  private static createAsyncOptionsProviders(
    options: HttpModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: HTTP_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    let inject;
    if (options.useExisting) inject = [options.useExisting];
    else if (options.useClass) inject = [options.useClass];
    return {
      provide: HTTP_MODULE_OPTIONS,
      useFactory: async (optionsFactory: HttpModuleOptionsFactory) =>
        optionsFactory.createHttpOptions(),
      inject,
    };
  }
}