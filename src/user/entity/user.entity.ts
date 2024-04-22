import { IsEmail, IsNotEmpty } from 'class-validator';
import { Role } from 'src/role/entity/role.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    firstName: string;

    @Column()
    @IsNotEmpty()
    lastName: string;

    @Column()
    @IsNotEmpty()
    phoneNumber: string;

    @Column()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Column()
    password: string;

    @Column({ name: 'roleId' })
    roleId: number

    @ManyToOne(() => Role, role => role.user)
    @JoinColumn({ name: 'roleId' })
    role: Role;

    @Column()
    status: boolean;

    @Column()
    createdBy: string;

    @CreateDateColumn()
    createdOn: Date;

    @Column()
    updatedBy: string;

    @UpdateDateColumn()
    updatedOn: Date;

}