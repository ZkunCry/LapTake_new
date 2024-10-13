import { Module } from "@nestjs/common";

import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { LaptopModule } from './laptop/laptop.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    LaptopModule,
  ],
})
export class AppModule {}
