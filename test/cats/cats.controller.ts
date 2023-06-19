import { Controller, Get, HttpCode, Param, Body, Post, Put, Redirect, Query, Delete } from '@nestjs/common';

import { Observable, of } from 'rxjs';

import { CatRequest } from './cat-request';
import { Cat } from './cat';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly service: CatsService) {}

  @Get('5238')
  @HttpCode(207)
  getCatsM() {
    return {
      name: 'tom',
      id: 5238,
      age: 18,
    };
  }

  @Get('docs')
  @Redirect('http://localhost:3000', 301)
  getDocs(/**@Query('version') version*/) {
    // 返回的值将覆盖传递给 @Redirect()装饰器的所有参数
    // if (version && version === '5') {
    //   return { url: 'https://docs.nestjs.com/v5/', statusCode: 301 };
    // } else {
    //   return { url: 'https://docs.nestjs.com/v6/', statusCode: 302 };
    // }
  }

  @Get()
  getCatList(): Observable<Cat[]> {
    return this.service.getCatList();
  }
  // or
  //   @Get()
  //   async getCatList(): Promise<any[]> {
  //     return [];
  //   }

  @Post()
  addCat(@Body() params: CatRequest): Observable<Cat> {
    return this.service.addCat(params);
  }

  // GET {{url}}/cats/12138?age=26
  @Get(':id')
  // getCat(@Param() params) {params.id
  getCat(@Param('id') id, @Query() query) {
    return {
      name: 'tom',
      id: id,
      age: 18,
      queryParams: JSON.stringify(query),
      params: JSON.stringify(id),
    };
  }

  @Put(':id')
  updateCat(@Param('id') id, @Body() params: any) {
    params.id = id;
    return params;
  }

  @Delete(':id')
  deleteCat(@Param('id') id) {
    return {
      code: 0,
      msg: `delete cat ${id} success`,
    };
  }
}
