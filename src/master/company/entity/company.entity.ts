import { IsEmail } from "class-validator"
import { Warehouse } from "src/master/warehouse/entity/warehouse.entity";
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
    
    @Column({ default: null })
    accountYear: string

    @Column({ default: null })
    referenceNumber: string

    @Column({ default: null })
    gstIn: string

    @Column({ default: null })
    address: string

    @Column({ default: null })
    @IsEmail()
    email: string;

    @Column({ default: null })
    mobileNumber: string;

    @Column({ default: false})
    deleted: boolean

    @Column({ default: null })
    createdBy: number;

    @CreateDateColumn()
    createdOn: Date;

    @Column({ default: null })
    updatedBy: number;

    @UpdateDateColumn()
    updatedOn: Date;

    @OneToMany(() => Warehouse, warehouse => warehouse.company)
    warehouse: Warehouse[];
}