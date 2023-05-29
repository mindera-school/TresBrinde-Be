import { ProductModule } from "./products/product.module";
import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import JwtAuthenticationGuard from "./auth/guards/jwtAuthentication.guard";
import { RolesGuard } from "./auth/guards/roles.guard";
import { CategoriesModule } from "./categories/categories.module";
import { FileModule } from "./files/file.module";
import { BudgetModule } from "./budget/budget.module";
import { MailerModule } from "@nestjs-modules/mailer";
import { EmailModule } from "./emailSender/email.module";
import { join } from "path";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";


@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: process.env.SEND_GRID_SERVER,
        auth: {
          user: process.env.SEND_GRID_USER,
          pass: process.env.SEND_GRID_ACCESS_KEY,
        },
      },
      template: {
        dir: join(__dirname, "mails"),
        adapter: new HandlebarsAdapter(),
      },
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    CategoriesModule,
    ProductModule,
    FileModule,
    BudgetModule,
    EmailModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthenticationGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
