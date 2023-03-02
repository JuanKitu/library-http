import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { HttpService } from '../services/http.service';
import { Request, Response } from 'express';

@Injectable()
export class HttpInterceptor implements NestInterceptor {
  constructor(private readonly http: HttpService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    this.http.initAxios(request.headers);
    return next.handle();
  }
}
