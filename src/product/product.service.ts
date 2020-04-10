import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult } from 'typeorm';

import { ProductConfig } from './product-config.entity';
import { IProductConfig } from './product-config.interface';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductConfig)
    private readonly productConfigRepository: Repository<ProductConfig>,
  ) {}

  getProductConfigList(): Promise<ProductConfig[]> {
    return this.productConfigRepository.find();
  }

  addProductConfig(productConfig: IProductConfig): Promise<InsertResult> {
    return this.productConfigRepository.insert(productConfig);
  }
}
