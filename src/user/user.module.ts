import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {UserController} from './user.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserRepository} from "./user.repository";
import {APP_GUARD} from "@nestjs/core";
import {IsSameUserGuard} from "../auth/guards/isSameUser.guard";

@Module({
    imports: [TypeOrmModule.forFeature([UserRepository])],
    controllers: [UserController],
    providers: [
        UserService,
        {
            provide: APP_GUARD,
            useClass: IsSameUserGuard,
        }
    ],
    exports: [UserService]
})
export class UserModule {
}
