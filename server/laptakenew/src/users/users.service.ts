import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UserDto } from "./users.dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import * as argon2 from "argon2";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userCredentials: UserDto) {
    try {
      return await this.prisma.user.create({
        data: userCredentials,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ConflictException(
            "User with this credentials is currently exist"
          );
        }
      }
    }
  }
  async changePassword(userId: string, newPass: string) {
    const hashedPassword = await argon2.hash(newPass);
    await this.prisma.user.update({
      where: { id: +userId },
      data: {
        password: hashedPassword,
      },
    });
    return "Password changed success!";
  }
  async delete(id: number) {
    console.log(id);
    try {
      return await this.prisma.user.delete({
        where: { id: +id },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new NotFoundException(`User with id ${id} not found`);
        }
      }
    }
  }
}
