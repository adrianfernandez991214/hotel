import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { httpErrorMessages } from 'src/mappings';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // TODO: Consider as an approach to handle errors in production mode
    // return next.handle().pipe(catchError((err) => throwError(this.transformError(err))));
    return next.handle();
  }

  private transformError(err: any) {
    // This is where you could inspect the exception and decide how to format it
    return {
      statusCode: err.status || 500,
      message: httpErrorMessages[err.status] || httpErrorMessages[500],
      stack: err.response || null,
    };
  }
}
