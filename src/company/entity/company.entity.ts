import { IsEmail } from "class-validator";
import { User } from "src/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'company' })
export class Company {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    companyName: string

    @Column({ default: null })
    location: string

    @Column({ default: null })
    code: string

    @Column({ default: null })
    vatTin: string

    @Column({ default: null })
    cstNo: string

    @Column({ default: null })
    pan: string

    @Column({ type: 'simple-json', default: null })
    address: { [key: string]: any }

    @Column({ default: null })
    @IsEmail()
    email: string;

    @Column({ default: null })
    password: string;

    @Column({ default: null })
    createdBy: number;

    @CreateDateColumn()
    createdOn: Date;

    @Column({ default: null })
    updatedBy: number;

    @UpdateDateColumn()
    updatedOn: Date;

    @OneToMany(() => User, user => user.company)
    user: User[];
}