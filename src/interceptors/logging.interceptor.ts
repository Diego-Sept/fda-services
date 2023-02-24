import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {

    private readonly logger = new Logger(LoggingInterceptor.name);


  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    let { url, method, headers, body } = context.switchToHttp().getRequest()
    this.logger.log("Handling request on method " + method + " " + url);
    

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => this.logger.log(`Closing request to method ${method} ${url} after... ${Date.now() - now}ms`)),
      );
  }
}