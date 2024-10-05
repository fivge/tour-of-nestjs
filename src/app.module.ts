import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import configuration from "./config/configuration";
import { AppController } from "./app.controller";
import { CatsModule } from "./cats/cats.module";
import { logger } from "./common/middleware/logger.middleware";
import { APP_FILTER } from "@nestjs/core";
import { HttpExceptionFilter } from "./common/filter/http-exception.filter";
import { AllExceptionsFilter } from "./common/filter/all-exception.filter";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env", ".env.local", ".env.demo"],
      isGlobal: true,
      load: [configuration],
      cache: true,
    }),
    CatsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes("*");
  }
}
