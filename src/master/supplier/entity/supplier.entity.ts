import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'supplier' })
export class Supplier {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    code: string

    @Column({ default: null })
    contactNo: string

    @Column({ default: null })
    contactPerson: string

    @Column({ default: null })
    vatTin: string

    @Column({ default: null })
    cstNo: string

    @Column({ default: null })
    pan: string

    @Column({ default: null })
    email: string

    @Column({ default: null })
    gstIn: string

    @Column({ default: null })
    termsOfPayment: string

    @Column({ default: null })
    productName: string

    @Column({ default: null })
    address: string

    @Column({ default: true })
    status: boolean

    @Column({ default: false })
    deleted: boolean

    @Column({ default: null })
    createdBy: number;

    @CreateDateColumn()
    createdOn: Date;

    @Column({ default: null })
    updatedBy: number;

    @UpdateDateColumn()
    updatedOn: Date;
}