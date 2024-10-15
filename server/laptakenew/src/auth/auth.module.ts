import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PrismaModule } from "src/prisma/prisma.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UsersModule } from "src/users/users.module";
import { UsersService } from "src/users/users.service";
import { JwtRefreshStrategy } from "src/strategies/jwt-refresh.strategy";
import { JwtAccessStrategy } from "src/strategies/jwt.strategy";

@Module({
  imports: [JwtModule.register({}), ConfigModule, PrismaModule, UsersModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    ConfigService,
    UsersService,
    JwtRefreshStrategy,
    JwtAccessStrategy,
  ],
})
export class AuthModule {}
