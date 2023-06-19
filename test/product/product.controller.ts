import { Controller, Get, Post, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { FileInterceptor, AnyFilesInterceptor } from '@nestjs/platform-express';
import * as XlsxPopulate from 'xlsx-populate';

import { ProductConfig } from './product-config.entity';
import { IProductConfig } from './product-config.interface';
import { ProductService } from './product.service';

type AOA = (string | number)[][];

@Controller('product')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) // FIXME: statusCode: 400 message: "Unexpected field" error: "Bad Request"
  uploadFile(@UploadedFile() file) {
    console.log(file);
    return {
      code: '0',
      msg: 'success',
    };
  }

  @Post('upload/any')
  @UseInterceptors(AnyFilesInterceptor())
  async uploadAnyFile(@UploadedFiles() files) {
    /** 文件名 */
    // const fileName = files[0].originalname;
    const workbookMap = new Map<string, AOA>();
    let errorFiles = [];
    await XlsxPopulate.fromDataAsync(files[0].buffer).then(workbook => {
      const sheets = workbook.sheets();
      for (const sheet of sheets) {
        const sheetName = sheet.name();
        const usedRange = sheet.usedRange();
        const sheetData: AOA = usedRange.value();
        const [, ...body] = [...sheetData];
        workbookMap.set(sheetName, body);
      }
    });
    for (const [key, value] of workbookMap) {
      for (let i = 0; i < value.length; i++) {
        let productConfig = new IProductConfig();
        productConfig = IProductConfig.fromArray(value[i]);
        productConfig.cloudcenter = key;
        try {
          await this.service.addProductConfig(productConfig);
        } catch (error) {
          errorFiles = [...errorFiles, { cloudcenter: key, num: i, result: error }];
        }
      }
    }

    if (errorFiles.length > 0) {
      return {
        code: '1',
        msg: 'error',
        res: errorFiles,
      };
    } else {
      return {
        code: '0',
        msg: 'success',
      };
    }
  }

  @Get('demo')
  getProductConfigListDemo(): Promise<ProductConfig[]> {
    return this.service.getProductConfigListDemo();
  }

  @Get('dev')
  getProductConfigListDev(): Promise<ProductConfig[]> {
    return this.service.getProductConfigListDev();
  }

  @Get('download')
  async downloadProductConfigListDemo() {
    let productConfigList: ProductConfig[] = [];
    try {
      productConfigList = await this.service.getProductConfigListDemo();
    } catch (error) {
      return {
        code: '1',
        msg: 'sql error',
        result: error,
      };
    }
    productConfigList = productConfigList.filter(item => item.cloudcenter === 'icp_hainan');

    await XlsxPopulate.fromBlankAsync().then(workbook => {
      let sheetData: AOA = [];
      const head = [
        'pid',
        'pcolid',
        'pcolname',
        'model',
        'ptype',
        'rangetype',
        'rangesize',
        'tprice',
        'spec',
        'servicedesc',
        'yprice',
        'isstandard',
      ];
      sheetData = [head];
      for (const item of productConfigList) {
        sheetData = [...sheetData, IProductConfig.toArray(item)];
      }
      const sheet = workbook.sheet(0).name('icp_hainan');
      sheet.cell('A1').value(sheetData);
      return workbook.toFileAsync('./out.xlsx');
    });

    return {
      code: '0',
      msg: 'success',
    };
  }
}
