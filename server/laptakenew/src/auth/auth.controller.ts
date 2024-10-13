import { Controller, Post, Body, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Response } from "express"; // Импортируем Response из express
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
    res.cookie("refresh_token", refreshToken, {
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
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return res.send(response);
  }
}
