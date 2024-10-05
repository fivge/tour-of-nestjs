// import { Injectable, NestMiddleware } from "@nestjs/common";

import { FastifyRequest, FastifyReply } from "fastify";

// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   use(req: any, res: any, next: () => void) {
//     console.log("sim log");
//     next();
//   }
// }

export function logger(
  req: FastifyRequest["raw"],
  res: FastifyReply["raw"],
  next: () => void,
) {
  next();
}
