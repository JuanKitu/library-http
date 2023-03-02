import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '../services/http.service';
import { AXIOS_INSTANCE_TOKEN } from '../constants/http.constants';
import Axios from 'axios';

describe('HttpService', () => {
  let service: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpService,
        {
          provide: 'AXIOS_INSTANCE_TOKEN',
          useValue: Axios
        }],
    }).compile();

    service = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
