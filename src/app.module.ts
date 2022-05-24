import {ProductModule} from './products/product.module';
import {Module} from "@nestjs/common";
import {UserModule} from './user/user.module';
import {DatabaseModule} from "./database/database.module";
import {AuthModule} from "./auth/auth.module";
import {ConfigModule} from "@nestjs/config";
import {APP_GUARD} from "@nestjs/core";
import JwtAuthenticationGuard from "./auth/guards/jwtAuthentication.guard";
import {RolesGuard} from "./auth/guards/roles.guard";
import {CategoriesModule} from "./categories/categories.module";
import {FileModule} from "./files/file.module";
import {BudgetModule} from "./budget/budget.module";

@Module({
    imports: [
        ConfigModule.forRoot(),
        DatabaseModule,
        UserModule,
        AuthModule,
        CategoriesModule,
        ProductModule,
        FileModule,
        BudgetModule
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtAuthenticationGuard,
        },
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        }
    ],
})

export class AppModule {
}