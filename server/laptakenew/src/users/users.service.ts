import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UserDto } from "./users.dto";
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userCredentials: UserDto) {
    return await this.prisma.user.create({
      data: userCredentials,
    });
  }

  async delete(id: number) {
    console.log(id);
    return await this.prisma.user.delete({
      where: { id: +id },
    });
  }
}
