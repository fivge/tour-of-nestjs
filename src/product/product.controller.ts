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
    let productConfig = new IProductConfig();
    await XlsxPopulate.fromDataAsync(files[0].buffer).then(function(workbook) {
      const fileName = files[0].originalname;
      const sheet0 = workbook.sheet(0);
      const sheetName = sheet0.name();
      console.log(fileName, sheetName);

      // const sheetData = sheet0.cell('A1').value();
      const usedRange = sheet0.usedRange(); // IMPORTANT! 设置完全部数据后才能使用
      const data: AOA = usedRange.value();
      let [head, ..._body] = [...data];
      // for (const iterator of object) {

      // }
      let body = _body[0];
      // console.log('head', head, _body.length);
      productConfig.pid = body[0] as string;
      productConfig.pcolid = body[1] as string;
      productConfig.pcolname = body[2] as string;
      productConfig.model = body[3] as string;
      productConfig.ptype = body[4] as number;
      productConfig.rangetype = body[5] as number;
      productConfig.rangesize = body[6] as string;
      productConfig.tprice = body[7] as string;
      productConfig.spec = body[8] as string;
      productConfig.servicedesc = body[9] as string;
      productConfig.yprice = body[10] as string;
      productConfig.isstandard = (body[11] as number) === 1 ? false : true;
      // return workbook.toFileAsync('./out.xlsx');
    });
    console.log('productConfig', productConfig);
    try {
      let res = await this.service.addProductConfig(productConfig);
      return {
        code: '0',
        msg: 'success',
        res,
      };
    } catch (error) {
      return {
        code: '1',
        msg: 'error',
        res: error,
      };
    }
  }

  @Get()
  getProductConfigList(): Promise<ProductConfig[]> {
    return this.service.getProductConfigList();
  }
}
