import { Module } from "@nestjs/common";
import { EmailController } from "./email.controller";
import { EmailService } from "./email.service";
import { ProductModule } from "src/products/product.module";
import { CategoriesModule } from "src/categories/categories.module";

@Module({
  controllers: [EmailController],
  providers: [EmailService],
  imports: [ProductModule, CategoriesModule],
})

export class EmailModule {}
