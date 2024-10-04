import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  // const app = await NestFactory.create(AppModule, new FastifyAdapter());
  const configService = app.get(ConfigService);
  const port = configService.get("PORT");
  console.log("🚀 service start on ", port);
  await app.listen(port);
  // await app.listen(3000, '0.0.0.0');
}
bootstrap();
