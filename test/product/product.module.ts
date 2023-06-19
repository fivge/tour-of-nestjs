import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductConfig } from './product-config.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductConfig], 'nestDemo'),
    TypeOrmModule.forFeature([ProductConfig], 'nestDev'),
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
