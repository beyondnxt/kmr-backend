import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'rope-die' })
export class RopeDie {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ default: null })
    itemCode: string

    @Column({ default: null })
    tapeDia: string

    @Column({ default: null })
    noOfJoint: string

    @Column({ default: null })
    strandDenier: string

    @Column({ default: null })
    singleTapeDenier: string

    @Column({ default: null })
    noOfTape: string

    @Column({ default: null })
    totalDenier: string

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