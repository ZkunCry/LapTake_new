import { Module } from "@nestjs/common";
import { LaptopService } from "./laptop.service";
import { LaptopController } from "./laptop.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [LaptopController],
  providers: [LaptopService],
})
export class LaptopModule {}
