import { isNotEmpty, IsNotEmpty, isString, IsString } from "class-validator";

export class UserDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
