import { HttpInterceptor } from '../interceptors/http.interceptor';

describe('HttpInterceptor', () => {
  it('should be defined', () => {
    expect(new HttpInterceptor()).toBeDefined();
  });
});
