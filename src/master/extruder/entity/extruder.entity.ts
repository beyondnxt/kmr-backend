import { Company } from "src/master/company/entity/company.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'extruder' })
export class Extruder {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ default: null })
    machineName: string

    @Column({ default: null })
    shortCode: string

    @Column({ default: null })
    location: number

    @ManyToOne(() => Company, company => company.extruder)
    @JoinColumn({ name: 'location' })
    company: Company

    @Column({ default: null })
    code: string

    @Column({ default: null })
    rpm: string

    @Column({ default: null })
    target: string

    @Column({ default: null })
    runningTime: string

    @Column({ default: null })
    spindle: string

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