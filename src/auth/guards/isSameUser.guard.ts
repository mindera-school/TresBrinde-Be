import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {UserRole} from "../../user/userRole.enum";
import {ROLES_KEY} from "../../decorators/roles.decorator";

@Injectable()
export class IsSameUserGuard implements CanActivate {
    constructor(private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean {
        this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        const {user} = context.switchToHttp().getRequest();

        if (!user) {
            return true;
        }

        if (user.role == UserRole.Admin) {
            return true;
        }

        if (user.id == context.switchToHttp().getRequest().url[context.switchToHttp().getRequest().url.length - 1]) {
            return true;
        }

        return false;
    }
}