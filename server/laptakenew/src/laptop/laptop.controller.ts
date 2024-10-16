import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Put,
} from "@nestjs/common";
import { LaptopService } from "./laptop.service";
import { CreateLaptopDto } from "./dto/create-laptop.dto";
import type { UpdateLaptopDto } from "./dto/update-laptop.dto";

@Controller("laptop")
export class LaptopController {
  constructor(private readonly laptopService: LaptopService) {}

  @Post("/create")
  async createLaptop(@Body() createLaptopDto: CreateLaptopDto) {
    return await this.laptopService.createLaptop(createLaptopDto);
  }
  @Delete("/delete/:id")
  async deleteLaptop(@Param("id") laptopId: number) {
    return await this.laptopService.deleteLaptop(laptopId);
  }
  @Put("/update/:id")
  async updateLaptop(
    @Param("id") laptopId: number,
    @Body() updateLaptopDto: UpdateLaptopDto
  ) {
    return await this.laptopService.updateLaptop({
      laptopId,
      ...updateLaptopDto,
    });
  }
  @Get("/all")
  async getAll() {
    return await this.laptopService.findAll();
  }
}
