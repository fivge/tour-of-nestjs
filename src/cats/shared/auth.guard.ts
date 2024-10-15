import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { FastifyRequest, FastifyReply } from "fastify";

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<FastifyRequest>();

    const result = await validateRequest(request);

    return result;
  }
}
async function validateRequest(request: FastifyRequest) {
  const { authorization } = request.headers;

  if (authorization && authorization.startsWith("bearer")) {
    return true;
  }

  return false;
}
