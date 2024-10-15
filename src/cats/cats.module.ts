import { Module } from "@nestjs/common";

import { CatsController } from "./cats.controller";
import { CatsService } from "./cats.service";
import { CatsControllerV2 } from "./cats.controller.v2";

@Module({
  controllers: [CatsController, CatsControllerV2],
  providers: [CatsService],
})
export class CatsModule {}
