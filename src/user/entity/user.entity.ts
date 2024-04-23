import { IsEmail, IsNotEmpty } from 'class-validator';
import { Company } from 'src/company/entity/company.entity';
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

    @Column({ name: 'companyId'})
    companyId: number

    @ManyToOne(() => Company, company => company.user)
    @JoinColumn({ name: 'companyId' })
    company: Company;

    @Column()
    status: boolean;

    @Column({ default: null })
    createdBy: number;

    @CreateDateColumn()
    createdOn: Date;

    @Column({ default: null })
    updatedBy: number;

    @UpdateDateColumn()
    updatedOn: Date;

}