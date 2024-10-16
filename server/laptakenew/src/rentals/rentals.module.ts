import { Module } from "@nestjs/common";
import { RentalsService } from "./rentals.service";
import { RentalsController } from "./rentals.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [RentalsController],
  providers: [RentalsService, PrismaService],
})
export class RentalsModule {}
