import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import configuration from "./config/configuration";
import { AppController } from "./app.controller";
import { CatsModule } from "./cats/cats.module";

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
  providers: [],
})
export class AppModule {}
