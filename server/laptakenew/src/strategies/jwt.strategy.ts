import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  "jwt-access"
) {
  constructor(
    private prisma: PrismaService,
    configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("ACCESS_TOKEN"), // Секрет для Access Token
    });
  }

  async validate(payload: any) {
    // Здесь мы получаем пользователя из базы данных по ID из payload
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    // Возвращаем пользователя для добавления в request
    if (!user) {
      throw new UnauthorizedException();
    }
    console.log(user);
    return user; // Теперь user будет доступен в request
  }
}
