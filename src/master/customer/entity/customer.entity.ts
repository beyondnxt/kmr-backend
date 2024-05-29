import { User } from "src/admin/user/entity/user.entity";
import { MainCustomer } from "src/master/main-customer/entity/main-customer.entity";
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

    @Column({ default: null })
    status: boolean

    @Column({ default: null })
    name: string

    @Column({ default: null })
    code: string

    @Column({ default: null })
    type: string

    @Column({ default: null })
    contactPerson: string

    @Column({ default: null })
    contactNo: string

    @Column({ default: null })
    stdCode: string

    @Column({ default: null })
    email: string

    @Column({ default: null })
    grade: string

    @Column()
    salesLeadId: number

    @ManyToOne(() => User, user => user.customer)
    @JoinColumn({ name: 'salesLeadId' })
    user: User;

    @Column({ default: null })
    salesCode: string

    @Column({ default: null })
    destinationPort: string

    @Column({ default: null })
    finalDestination: string

    @Column({ default: null })
    pieceWeightTolerance: string

    @Column({ default: null })
    invoiceTolerance: string

    @Column({ default: null })
    state: string

    @Column({ default: null })
    gstIn: string

    @Column({ default: null })
    aadhaarNumber: number

    @Column({ default: null })
    pan: number

    @Column({ default: null })
    country: string

    @Column({ default: null })
    lookupSLID: string

    @Column({ default: false})
    deleted: boolean

    @Column({ default: null })
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