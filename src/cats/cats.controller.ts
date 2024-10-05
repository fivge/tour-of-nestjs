import {
  Controller,
  Get,
  HttpCode,
  Param,
  Headers,
  Body,
  Post,
  Put,
  Redirect,
  Query,
  Delete,
  Req,
  Ip,
  HostParam,
  All,
  Header,
  Res,
  HttpException,
  HttpStatus,
} from "@nestjs/common";

import { Observable, of } from "rxjs";
import { FastifyReply } from "fastify";

import { Cat, CatRequest } from "./cat";
import { CatsService } from "./cats.service";
import { CreateCatDto } from "./dto/create-cat.dto";
import { ErrorBean } from "src/common/error/error.bean";

@Controller("cats")
export class CatsController {
  constructor(private readonly service: CatsService) {}

  @Get()
  async getCatList(@Query() query) {
    return this.service.getCatList(query);
  }

  @Get("observable")
  getCatListObservable() {
    return this.service.getCatListObservable();
  }

  @Get("showparams")
  async getCatListWithParams(
    @Query() query,
    @Headers() headers,
    @Ip() ip,
    @HostParam() hostParam,
  ) {
    const toS = (v) => {
      try {
        return JSON.parse(JSON.stringify(v));
      } catch (error) {
        return v;
      }
    };

    const data = await this.service.getCatList();
    const res = {
      data,
      query: toS(query),
      headers: toS(headers),
      ip: toS(ip),
      hostParam: toS(hostParam),
    };

    return res;
  }

  @Get("fastify")
  @HttpCode(207)
  async getCatListFastify(@Res() res: FastifyReply) {
    const list = await this.service.getCatList();
    res.headers({
      foo: "bar",
      foo2: "bar2",
    });
    res.code(208);
    res.send({ list });
    // * return 不起作用
    // return { list };
  }

  @Get("fastify2")
  @HttpCode(207)
  async getCatListWithFastify(@Res({ passthrough: true }) res: FastifyReply) {
    const list = await this.service.getCatList();
    res.headers({
      foo: "bar",
      foo2: "bar2",
    });
    return { list };
  }

  @Get("y2z8wz")
  @HttpCode(207)
  @Header("Custom-Header", "tom")
  async getCatsTom() {
    const cat = await this.service.getCat("y2z8wz");
    return { ...cat, special: true };
  }

  @Get("docs")
  @Redirect("http://localhost:5002/cats", 301)
  getDocs(/**@Query('version') version*/) {
    // 返回的值将覆盖传递给 @Redirect()装饰器的所有参数
    // if (version && version === '5') {
    //   return { url: 'https://docs.nestjs.com/v5/', statusCode: 301 };
    // } else {
    //   return { url: 'https://docs.nestjs.com/v6/', statusCode: 302 };
    // }
  }

  @Get(":id")
  async getCat(@Param("id") id) {
    try {
      const cat = await this.service.getCat(id);
      return cat;
    } catch (error) {
      // , @Res({ passthrough: true }) res: FastifyReply
      // res.code(404);
      // return { code: 0, message: "cat not found" };

      // throw new HttpException("cat not found", HttpStatus.NOT_FOUND);

      // throw new HttpException(
      //   { code: 0, message: "cat not found" },
      //   HttpStatus.NOT_FOUND,
      //   { cause: error },
      // );

      throw new ErrorBean(
        HttpStatus.NOT_FOUND,
        { code: 0, message: "cat not found" },
        error,
      );
    }
  }

  @Get("unhandlecat/throw")
  async getCatUnhandle() {
    throw new Error("unhandlecat");
  }

  @Get("unhandlecat/reject")
  async getCatUnhandleReject() {
    return Promise.reject("unhandlecat");
  }

  // 顺序不重要 :id 不影响该函数
  @Get("lastid")
  async getCatsFooo() {
    return "foooo";
  }

  @Post()
  addCat(@Body() params: CatRequest) {
    return this.service.addCat(params);
  }

  @Post("validation")
  addCatWithValidation(@Body() params: CreateCatDto) {
    return this.service.addCat(params);
  }

  @Put(":id")
  updateCat(@Param("id") id, @Body() params: any) {
    params.id = id;
    return params;
  }

  @Delete(":id")
  deleteCat(@Param("id") id) {
    return {
      code: 0,
      msg: `delete cat ${id} success`,
    };
  }

  @All(":id/method")
  getCatWithAllMethod() {
    return "foooooooooxx";
  }

  // 不允许通配符
  // @Get("ba*r")
  fooo() {
    return "bar";
  }
}
