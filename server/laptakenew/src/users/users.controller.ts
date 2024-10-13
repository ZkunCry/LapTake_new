import { Controller, Post, Body, Delete, Param } from "@nestjs/common";
import { UsersService } from "./users.service";
import type { UserDto } from "./users.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("/create")
  async create(@Body() userCredentials: UserDto) {
    return await this.usersService.create(userCredentials);
  }

  @Delete("/delete/:id")
  async delete(@Param("id") id: number) {
    return await this.usersService.delete(id);
  }
  @Post("/password/change")
  async changePassword(
    @Body("oldPassword") oldPass: string,
    @Body("newPassword") newPassword: string
  ) {
    return "Hyi";
  }
}
