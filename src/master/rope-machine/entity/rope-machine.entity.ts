import { Company } from "src/master/company/entity/company.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'rope-machine' })
export class RopeMachine {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ default: null })
    location: number

    @ManyToOne(() => Company, company => company.ropeMachine)
    @JoinColumn({ name: 'location' })
    company: Company

    @Column({ default: null })
    machineName: string

    @Column({ default: null })
    shortCode: string

    @Column({ default: null })
    maximumCoilingHead: string

    @Column({ default: null })
    noOfStrand: string

    @Column({ default: null })
    spindlePerStrand: string

    @Column({ default: null })
    itemCode: string

    @Column({ default: null })
    hourProduction: string

    @Column({ default: null })
    runningHours: string

    @Column({ default: false })
    deleted: boolean

    @Column({ default: null })
    createdBy: number

    @CreateDateColumn()
    createdOn: Date

    @Column({ default: null })
    updatedBy: number

    @UpdateDateColumn()
    updatedOn: Date

}