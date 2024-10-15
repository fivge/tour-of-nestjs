import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import { Roles } from "./roles.decorator";
import { FastifyRequest } from "fastify";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      // common roles
      return true;
    }
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const { authorization } = request.headers;

    return matchRoles(roles, authorization);
  }
}

const matchRoles = async (roles: string[], token?: string) => {
  // * 理论上需要对token鉴权后，从token中解析验证获取用户角色信息
  // * 或者 实现【用户中心】，调【用户中心】服务，根据token的id获取业务上的用户id
  // * 根据业务上的用户id，获取用户权限信息
  // *【用户中心】实现
  // * 实现【配置中心】，在其中配置接口、页面等权限，生成权限码。权限码在代码中硬编码?(初步方案)
  // * 可以配置制定用户指定权限
  // * 【用户中心】根据用户id和权限码、用户角色信息，调【配置中心】服务，实现权限授予
  // * user => login() => [token] => api() => business service() =[token, authCode]=> user service()
  // * user service() =`0 [token]`=> auth service() => [auth result] => [userId]
  // * user service() =`1 [userId, authCode]`=> business auth service() => [business auth result]
  // * token
  // * A#B#C A => api access auth()~quickly; B => role access auth()~safe
  if (!token) {
    return false;
  }

  // 后续可以考虑使用二进制形式实现 ACL, 方便快速实现权限计算更新赋予
  // 参考linux用户和组权限
  // rwx 110 = 6
  if (roles.some((role) => token.includes(role))) {
    return true;
  }

  return false;
};
