import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {UserRole} from "../userRole.enum";

@Entity()
export class UserEntity {
    constructor(partial: Partial<UserEntity> = {}) {
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 120, unique: true})
    email: string;

    @Column({length: 100})
    password: string;

    @Column({length: 30})
    role: UserRole;

    @Column({length: 9, nullable: true})
    NIF: string;

    @Column({length: 100, nullable: true})
    company_name: string;

    @Column({length: 60})
    name: string;

    @Column({length: 50})
    country: string;

    @Column({length: 7})
    postal_code: string;

    @Column({length: 40})
    city: string;

    @Column({length: 60})
    address: string;

    @Column({length: 9})
    contact: string;
}