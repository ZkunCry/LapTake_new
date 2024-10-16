import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateLaptopDto } from "./dto/create-laptop.dto";
import type { UpdateLaptopDto } from "./dto/update-laptop.dto";
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
  async deleteLaptop(laptopId: number) {
    const laptop = await this.prisma.laptop.findUnique({
      where: { id: +laptopId },
    });
    if (!laptop) throw new NotFoundException("Laptop not found");
    const result = await this.prisma.laptop.delete({
      where: { id: +laptopId },
    });
    return result;
  }
  async updateLaptop(updateLaptopDto: UpdateLaptopDto) {
    const { laptopId, ...newData } = updateLaptopDto;
    const laptop = await this.prisma.laptop.findUnique({
      where: { id: +laptopId },
    });
    if (!laptop) throw new NotFoundException("Laptop not found");
    const laptopNew = await this.prisma.laptop.update({
      where: { id: +laptopId },
      data: { ...newData },
    });
    return laptopNew;
  }
  async findAll() {
    return this.prisma.laptop.findMany();
  }
}
