import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateLaptopDto {
  @IsNumber()
  @IsNotEmpty()
  laptopId: number;
  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsString()
  @IsNotEmpty()
  specs: string; // Технические характеристики (процессор, память, экран и т.д.)

  @IsNumber()
  @IsNotEmpty()
  pricePerDay: number; // Цена за день аренды

  @IsBoolean()
  @IsNotEmpty()
  isAvailable: boolean; // Статус доступности ноутбука
}
