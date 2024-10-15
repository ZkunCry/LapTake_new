import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  UseGuards,
  SetMetadata,
  Req,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserDto } from "./users.dto";
import { AccessTokenGuard } from "src/guards/access-token.guard";
import { RolesGuard } from "src/guards/roles.guard";
import { RefreshTokenGuard } from "src/guards/refresh-token.guard";

@UseGuards(AccessTokenGuard, RefreshTokenGuard)
@SetMetadata("roles", ["ADMIN"])
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(RolesGuard)
  @SetMetadata("roles", ["ADMIN"])
  @Post("/create")
  async create(@Body() userCredentials: UserDto) {
    return await this.usersService.create(userCredentials);
  }
  @UseGuards(RolesGuard)
  @SetMetadata("roles", ["ADMIN"])
  @Delete("/delete/:id")
  async delete(@Param("id") id: number) {
    return await this.usersService.delete(id);
  }
  @Post("/password/change")
  async changePassword(
    @Req() request,
    @Body("newPassword") newPassword: string
  ) {
    return await this.usersService.changePassword(request.user.id, newPassword);
  }
}
