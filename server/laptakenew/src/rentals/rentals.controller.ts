import { Controller, Body, Post, Patch, Param } from "@nestjs/common";
import { RentalsService } from "./rentals.service";
import { CreateRentalDto } from "./dto/create-rental.dto";

@Controller("rentals")
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @Post("/create")
  async createRental(@Body() createRentalDto: CreateRentalDto) {
    return await this.rentalsService.createRental(createRentalDto);
  }
  @Patch("end/:id")
  async endRental(@Param("id") rentalId: number) {
    return await this.rentalsService.endRental(rentalId);
  }
}
