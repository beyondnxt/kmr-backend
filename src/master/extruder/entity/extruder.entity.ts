import { Company } from "src/master/company/entity/company.entity";
import { RopeSpecification } from "src/master/rope-specification/entity/rope-specification.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
    die: string

    @Column({ default: null })
    noOfHoles: string

    @Column({ default: null })
    denier: string

    @Column({ default: null })
    lineSpeed: string

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

    @OneToMany(() => RopeSpecification, ropeSpecification => ropeSpecification.extruder)
    ropeSpecification: RopeSpecification
}