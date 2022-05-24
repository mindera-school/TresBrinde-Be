import {EntityRepository, Repository} from "typeorm";
import {UserEntity} from "./entities/user.entity";
import {Injectable} from "@nestjs/common";

@Injectable()
@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
    getPaginatedUsers(limit: number, page: number) {
        return this.createQueryBuilder('UE')
            .take(limit)
            .skip(limit * (page - 1))
            .getMany()
    }

}