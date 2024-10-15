import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as argon2 from "argon2";
import { PrismaService } from "src/prisma/prisma.service";
import type { ILogin, IRegister } from "src/types/types";
import { UsersService } from "src/users/users.service";
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService
  ) {}

  async signUp(userCredentials: IRegister) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: userCredentials.email },
    });
    if (existingUser) {
      // Если пользователь уже существует, выбрасываем исключение
      throw new ConflictException("User with this email already exists");
    }
    const hashedPassword = await argon2.hash(userCredentials.password);

    const user = await this.userService.create({
      ...userCredentials,
      password: hashedPassword,
      refreshToken: null,
    });
    const tokens = await this.generateTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    const { password, refreshToken, ...response } = user;
    return { ...response, ...tokens };
  }
  async signIn(userCredentials: ILogin) {
    const user = await this.prisma.user.findUnique({
      where: { email: userCredentials.email },
    });
    if (!user) {
      throw new UnauthorizedException("Invalid email or password.");
    }
    console.log(user.password, userCredentials.password);
    const passwordValid = await argon2.verify(
      user.password,
      userCredentials.password
    );
    if (!passwordValid) {
      throw new UnauthorizedException("Invalid password.");
    }
    const tokens = await this.generateTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    const { password, refreshToken, ...response } = user;
    return { ...response, ...tokens };
  }

  // Обновление токенов по refreshToken
  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.refreshToken) {
      throw new UnauthorizedException("Access denied");
    }
    const tokens = await this.generateTokens(user.id, user.email);

    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  // Метод для обновления refreshToken в базе данных
  async updateRefreshToken(userId: number, refreshToken: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: refreshToken },
    });
  }

  // Генерация access и refresh токенов
  private async generateTokens(userId: number, email: string) {
    const payload = { sub: userId, email };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>("ACCESS_TOKEN"),
      expiresIn: "60m",
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>("REFRESH_TOKEN"),
      expiresIn: "30d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
