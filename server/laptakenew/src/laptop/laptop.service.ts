import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateLaptopDto } from "./laptop.dto";
@Injectable()
export class LaptopService {
  constructor(private readonly prisma: PrismaService) {}
  async createLaptop(createLaptopDto: CreateLaptopDto) {
    const { brand, model, specs, pricePerDay, isAvailable } = createLaptopDto;

    // Сохраняем новый ноутбук в базе данных
    return this.prisma.laptop.create({
      data: {
        brand,
        model,
        specs,
        pricePerDay,
        isAvailable,
      },
    });
  }
  async findAll() {
    return this.prisma.laptop.findMany();
  }
}
