import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  "jwt-refresh"
) {
  constructor(
    private prisma: PrismaService,
    configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const token = request?.cookies["refreshToken"]; // Извлечение refresh токена из cookies
          if (!token) {
            return null;
          }
          return token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("REFRESH_TOKEN"), // Секрет для Refresh Token
    });
  }

  async validate(payload: any) {
    // Здесь payload содержит данные пользователя, извлеченные из refresh токена
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub }, // sub содержит ID пользователя
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user; // Данные пользователя будут доступны в запросе после аутентификации
  }
}
