import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { Request } from 'express';
  
  @Injectable()
  export class InjectIdInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
      const request = context.switchToHttp().getRequest<Request>();
  
      const idParam = request.params?.id;
      const id = idParam ? Number(idParam) : null;
  
      if (request.body && id !== null && !isNaN(id)) {
        (request.body as { id?: number }).id = id;
      }
  
      return next.handle();
    }
  }
  