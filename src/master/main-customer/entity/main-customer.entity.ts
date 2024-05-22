import { Customer } from "src/master/customer/entity/customer.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'main-customer' })
export class MainCustomer {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    code: string

    @Column()
    type: string

    @Column()
    country: string

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

    @OneToMany(() => Customer, customer => customer.mainCustomer)
    customer: Customer[];
}