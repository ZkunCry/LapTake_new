import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Получаем пользователя из request (он будет доступен после проверки access token)
    console.log(user);
    const requiredRoles = this.reflector.get<string[]>(
      "roles",
      context.getHandler()
    );
    if (!requiredRoles) {
      return true; // Если роли не указаны, доступ разрешен
    }
    console.log(requiredRoles);
    return requiredRoles.some((role) => user.role?.includes(role)); // Проверяем наличие роли у пользователя
  }
}
