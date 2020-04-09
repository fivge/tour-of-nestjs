import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CatsModule } from './cats/cats.module';
import { Photo } from './photo/photo.entity';
import { PhotoModule } from './photo/photo.module';

const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '1234',
  database: 'nest_demo',
  // entities: ['dist/**/*.entity{.ts,.js}'],
  entities: [Photo],
  synchronize: true,
};

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfig), PhotoModule, CatsModule, PhotoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
