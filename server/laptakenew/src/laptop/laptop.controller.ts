import { Body, Controller, Post, Get } from "@nestjs/common";
import { LaptopService } from "./laptop.service";
import { CreateLaptopDto } from "./laptop.dto";

@Controller("laptop")
export class LaptopController {
  constructor(private readonly laptopService: LaptopService) {}

  @Post("/create")
  createLaptop(@Body() createLaptopDto: CreateLaptopDto) {
    return this.laptopService.createLaptop(createLaptopDto);
  }
  @Get("/all")
  getAll() {
    return this.laptopService.findAll();
  }
}
