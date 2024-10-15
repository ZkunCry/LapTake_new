import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { JwtRefreshStrategy } from "src/strategies/jwt-refresh.strategy";

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, JwtRefreshStrategy],
  exports: [UsersModule],
})
export class UsersModule {}
