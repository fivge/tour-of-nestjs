import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from "@nestjs/common";
import { FastifyRequest, FastifyReply } from "fastify";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();
    const status = exception.getStatus();

    // TODO add logger : exception.cause

    let payload = exception.getResponse();
    payload =
      typeof payload === "object" ? payload : { code: 0, message: payload };

    // payload = {
    //   ...payload,
    //   timestamp: new Date().toISOString(),
    //   path: request.url,
    // };

    response.status(status).send(payload);
  }
}
