import { Module } from "@nestjs/common";

import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { LaptopModule } from './laptop/laptop.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    LaptopModule,
    TransactionModule,
  ],
})
export class AppModule {}
