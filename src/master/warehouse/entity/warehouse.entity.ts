import { Company } from "src/master/company/entity/company.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'warehouse' })
export class Warehouse {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ default: null })
    companyId: number

    @ManyToOne(() => Company, company => company.warehouse)
    @JoinColumn({ name: 'companyId' })
    company: Company

    @Column({ default: null })
    location: string

    @Column({ default: null })
    code: string

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