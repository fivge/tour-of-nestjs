import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult } from 'typeorm';

import { ProductConfig } from './product-config.entity';
import { IProductConfig } from './product-config.interface';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductConfig, 'nestDemo')
    private readonly productConfigDemoRepository: Repository<ProductConfig>,
    @InjectRepository(ProductConfig, 'nestDev')
    private readonly productConfigDevRepository: Repository<ProductConfig>,
  ) {}

  getProductConfigListDemo(): Promise<ProductConfig[]> {
    return this.productConfigDemoRepository.find();
  }

  getProductConfigListDev(): Promise<ProductConfig[]> {
    return this.productConfigDevRepository.find();
  }

  addProductConfig(productConfig: IProductConfig): Promise<InsertResult> {
    let res;
    try {
      res = this.productConfigDevRepository.insert(productConfig);
    } catch (error) {
      res = error;
    }
    return res;
  }
}
