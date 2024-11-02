import { ExceptionFilter, Catch, HttpException, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus();

    const message = exception.getResponse();
    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: this.getCustomMessage(status, message),
    };

    response.status(status).json(errorResponse);
  }

  private getCustomMessage(status: number, originalMessage: any): string {
    if (status === 500) {
      return 'Ini custom message kalau error 500.';
    }
    return typeof originalMessage === 'string' ? originalMessage : originalMessage['message'] || originalMessage;
  }
}
