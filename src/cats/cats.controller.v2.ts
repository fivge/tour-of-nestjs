// 管道、异常过滤器、守卫

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
  ParseIntPipe,
  UsePipes,
  BadRequestException,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";

import { Observable, of } from "rxjs";
import { FastifyReply } from "fastify";

import { Cat, CreateCatDto, CreateCatDto2, createCatSchema } from "./cat";
import { CatsService } from "./cats.service";
import { ErrorBean } from "src/common/error/error.bean";
import {
  ClassValidationPipe,
  ValidationPipe,
  ZodValidationPipe,
} from "./pipe/validation.pipe";
import { AuthGuard } from "./shared/auth.guard";
import { RolesGuard } from "./shared/roles.guard";
import { Roles } from "./shared/roles.decorator";
import { LoggingInterceptor } from "src/common/interceptor/logging.interceptor";
import { TransformInterceptor } from "src/common/interceptor/transform.interceptor";

@Controller("cats")
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
export class CatsControllerV2 {
  constructor(private readonly service: CatsService) {}

  @Get("guard/auth1")
  getAuthedData1() {
    return "success";
  }

  @Get("guard/auth2")
  @UseGuards(AuthGuard)
  getAuthedData2() {
    return "success";
  }

  @Get("guard/role")
  getRoleData() {
    return "common data";
  }

  @Get("guard/role2")
  @Roles(["admin"])
  getRoleData2() {
    return "admin data";
  }

  @Get("guard/role3")
  @Roles(["user"])
  getRoleData3() {
    return "user data";
  }

  @Get("interceptor/demo1")
  @UseInterceptors(TransformInterceptor)
  getInterceptorData() {
    return "some data";
  }
}
