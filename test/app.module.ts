import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CatsModule } from './cats/cats.module';
import { PhotoModule } from './photo/photo.module';
import { ProductModule } from './product/product.module';

import { Photo } from './photo/photo.entity';
import { ProductConfig } from './product/product-config.entity';

const defaultOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '1234',
  synchronize: true,
};

const dbDefaultOptions: TypeOrmModuleOptions = {
  ...defaultOptions,
  // name: 'default', // 如果未为连接设置任何 name ，则该连接的名称将设置为 default
  // 不应该有多个没有名称或同名的连接，否则它们会被覆盖
  database: 'nest_demo',
  entities: [Photo],
};

const dbDemoOptions: TypeOrmModuleOptions = {
  ...defaultOptions,
  name: 'nestDemo',
  database: 'nest_demo',
  entities: [ProductConfig],
};

const dbDevOptions: TypeOrmModuleOptions = {
  ...defaultOptions,
  name: 'nestDev',
  database: 'nest_dev',
  entities: [ProductConfig],
};

@Module({
  imports: [
    TypeOrmModule.forRoot(dbDefaultOptions),
    TypeOrmModule.forRoot(dbDemoOptions),
    TypeOrmModule.forRoot(dbDevOptions),
    PhotoModule,
    CatsModule,
    PhotoModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
