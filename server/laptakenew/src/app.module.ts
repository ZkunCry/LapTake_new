import { Module } from "@nestjs/common";

import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { LaptopModule } from "./laptop/laptop.module";
import { TransactionModule } from "./transaction/transaction.module";
import { ReviewModule } from "./review/review.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    LaptopModule,
    TransactionModule,
    ReviewModule,
    UsersModule,
  ],
})
export class AppModule {}
