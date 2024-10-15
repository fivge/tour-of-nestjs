# tour of nestjs

## Archs

- [NestJS](https://docs.nestjs.com/)

### doc

#### Node JS Platform does not follow Request/Response Multi-Threaded Stateless Model.

#### 命名

Request

Response

ResponseBean

DTO Data Transfer Object

DAO ?

    var customerDao = new CustomerDaoImpl(dataSource);

CustomerDaoImpl

interface EmployeeRepository extends CrudRepository<Employee, Long> {}

FooMapper

```
Cat
CatRequest
CatResponse
```

```
ResponseBean
```

1.数据对象：xxx**DO**，xxx即为**数据表名**；

2.数据传输对象：xxx**DTO**，xxx为**业务领域**相关的名称；

3.展示对象：xxx**VO**，xxx一般为**网页**的名称；

4.**POJO** 是DO/DTO/BO/VO的**统称**，**禁止**命名成xxxPOJO。

https://developer.aliyun.com/article/944026

目录结构 命名

#### 响应

https://restfulapi.cn/restful-api-response

HTTP 状态码 + 业务码

```json
{
  "code": 0,
  "message": "",
  "data": {}
}
```

## dev

### RxJS/Promise

rxjs is too hard to begin. use Promise at first.

### controllers

|                                                |                                     |
| ---------------------------------------------- | ----------------------------------- |
| `@Request(), @Req()`                           | `req`                               |
|                                                |                                     |
| `@Response(), @Res()`_ `@Response(), @Res()` _ | `res`                               |
| `@Next()`                                      | `next`                              |
| `@Session()`                                   | `req.session`                       |
| `@Param(key?: string)`                         | `req.params` / `req.params[key]`    |
| `@Body(key?: string)`                          | `req.body` / `req.body[key]`        |
| `@Query(key?: string)`                         | `req.query` / `req.query[key]`      |
| `@Headers(name?: string)`                      | `req.headers` / `req.headers[name]` |
| `@Ip()`                                        | `req.ip`                            |
| `@HostParam()`                                 | `req.hosts`                         |

特定处理

https://docs.nestjs.com/controllers#library-specific-approach

https://docs.nestjs.com/techniques/performance

###

> TODO middleware, exception-filters, pipes, Guards, interceptors

使用场景

代码实现

注入范围

执行顺序/优先级

错误处理

### 错误处理

https://docs.nestjs.com/exception-filters

```ts
throw new HttpException(
  { code: 0, message: "cat not found" },
  HttpStatus.FORBIDDEN,
  { cause: error },
);
```

TODO **pipe 不走filter**

### Pipes & validation

#### Schema based validation

`zod` https://github.com/colinhacks/zod

> TypeScript-first schema validation with static type inference

```jsonc
{
  "compilerOptions": {
    // ...
    // "strict": true,
    "strictNullChecks": true,
  },
}
```

#### Class validator

class-validator class-transformer

我们的ValidationPipe可以过滤掉方法处理程序不应接收的属性。在这种情况下，我们可以将可接受的属性列入白名单，并且任何未包含在白名单中的属性都会自动从结果对象中删除。在CreateCatDto示例中，我们的白名单是name 、 age和breed属性。在这里了解更多信息。

#### validation

https://docs.nestjs.com/techniques/validation

### middlewares

- logger
- helmet
- cors

### Guards 守卫

permissions, roles, ACLs

authorization

范围

controller-scoped, method-scoped, or global-scoped 控制器、方法、全局

`@UseGuards()` `app.useGlobalGuards()`

守卫抛出的任何异常都将由异常层（全局异常过滤器和应用于当前上下文的任何异常过滤器）处理。

### orm

> sql

- mariadb
- ~~MongoDB~~
- [FerretDB](https://github.com/FerretDB/FerretDB)

https://docs.nestjs.com/recipes/prisma

- <https://github.com/typeorm/typeorm>
- <https://github.com/sequelize/sequelize>

### cheatlist

module

controller

## techniques

### env

`@nestjs/config`

```ts
const salt = this.configService.get<string>("hashsalt.cats");
```

### swc

    "@swc/cli": "^0.4.1-nightly.20240914",
    "@swc/core": "^1.7.26",

### fastify

@nestjs/platform-fastify

https://docs.nestjs.com/techniques/performance

https://github.com/nestjs/nest/tree/master/sample/10-fastify

`: FastifyReply["raw"]`
