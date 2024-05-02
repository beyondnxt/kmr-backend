import { MainCustomer } from "src/main-customer/entity/main-customer.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'customer' })
export class Customer {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    mainCustomerId: number

    @ManyToOne(() => MainCustomer, mainCustomer => mainCustomer.customer)
    @JoinColumn({ name: 'mainCustomerId' })
    mainCustomer: MainCustomer;

    @Column()
    status: boolean

    @Column()
    name: string

    @Column()
    code: string

    @Column()
    type: string

    @Column()
    contactPerson: string

    @Column()
    contactNo: string

    @Column()
    email: string

    @Column()
    grade: string

    @Column()
    salesLeadName: string

    @Column()
    salesCode: string

    @Column()
    destinationPort: string

    @Column()
    finalDestination: string

    @Column()
    pieceWeightTolerance: string

    @Column()
    invoiceTolerance: string

    @Column()
    state: string

    @Column()
    gstIn: string

    @Column()
    aadhaarNumber: number

    @Column()
    pan: number

    @Column()
    country: string

    @Column()
    HandledBy: string

    @Column()
    address: string

    @Column({ default: null })
    createdBy: number;

    @CreateDateColumn()
    createdOn: Date;

    @Column({ default: null })
    updatedBy: number;

    @UpdateDateColumn()
    updatedOn: Date;
}