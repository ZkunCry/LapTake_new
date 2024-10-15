import { Controller, Post, Body, Res, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Response } from "express"; // Импортируем Response из express
import { RefreshTokenGuard } from "src/guards/refresh-token.guard";
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post("signup")
  async register(
    @Body("email") email: string,
    @Body("password") password: string,
    @Res() res: Response,
    @Body("name") name?: string
  ) {
    const { refreshToken, ...response } = await this.authService.signUp({
      email: email,
      password: password,
      name: name,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return res.send(response);
  }

  @Post("signin")
  async login(
    @Body("email") email: string,

    @Body("password") password: string,
    @Res() res: Response
  ) {
    const { refreshToken, ...response } = await this.authService.signIn({
      email: email,
      password: password,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return res.send(response);
  }
  @UseGuards(RefreshTokenGuard)
  @Post("refresh")
  async refresh(@Req() request: any, @Res() response: Response) {
    const userId = request.user.id;
    const refreshToken = request?.cookies.refreshToken;
    const tokens = await this.authService.refreshTokens(userId, refreshToken);
    response.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return response.send({ accessToken: tokens.accessToken });
  }
}
