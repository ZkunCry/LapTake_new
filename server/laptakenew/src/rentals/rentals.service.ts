import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateRentalDto } from "./dto/create-rental.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class RentalsService {
  constructor(private readonly prisma: PrismaService) {}

  async createRental(createRentalDto: CreateRentalDto) {
    const { userId, laptopId, startDate, endDate, totalAmount } =
      createRentalDto;

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user)
      throw new NotFoundException(`User with id = ${userId} not found`);
    const laptop = await this.prisma.laptop.findUnique({
      where: {
        id: laptopId,
      },
    });
    if (!laptop)
      throw new NotFoundException(`Laptop with id = ${userId} not found`);
    if (!laptop.isAvailable)
      throw new BadRequestException(
        "Laptop is currently not available for rental."
      );
    const rental = await this.prisma.rental.create({
      data: {
        totalAmount,
        startDate,
        endDate,
        user: {
          connect: { id: userId },
        },
        laptop: {
          connect: { id: laptopId },
        },
      },
    });
    await this.prisma.laptop.update({
      where: { id: laptopId },
      data: { isAvailable: false },
    });
    return rental;
  }
  async endRental(rentalId: number) {
    const rental = await this.prisma.rental.findUnique({
      where: { id: +rentalId },
      include: { laptop: true },
    });
    if (!rental) throw new NotFoundException("Rental not found");
    await this.prisma.laptop.update({
      where: { id: rental.laptopId },
      data: { isAvailable: true },
    });
    return rental;
  }
}
