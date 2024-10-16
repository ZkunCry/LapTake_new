import {
  IsNotEmpty,
  IsNumber,
  IsLongitude,
  IsDateString,
} from "class-validator";

export class CreateRentalDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  laptopId: number;

  @IsDateString()
  @IsNotEmpty()
  startDate: Date;

  @IsDateString()
  @IsNotEmpty()
  endDate: Date;

  @IsLongitude()
  @IsNotEmpty()
  totalAmount: number;
}
