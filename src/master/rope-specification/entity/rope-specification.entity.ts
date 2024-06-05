import { Color } from "src/master/color/entity/color.entiry";
import { Extruder } from "src/master/extruder/entity/extruder.entity";
import { RopeGrade } from "src/master/rope-grade/entity/rope-grade.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'rope-specification' })
export class RopeSpecification {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ default: null, type: 'bigint' })
    sampleNo: number

    @Column({ default: null, type: 'date' })
    date: Date

    @Column({ default: null })
    ropeSize: string

    @Column({ default: null })
    colorId: number

    @ManyToOne(() => Color, color => color.ropeSpecification)
    @JoinColumn({ name: 'colorId' })
    color: Color

    @Column({ default: null })
    type: string

    @Column({ default: null, type: 'bigint' })
    twist: number

    @Column({ default: null })
    customer: string

    @Column({ default: null })
    ropeGradeId: number

    @ManyToOne(() => RopeGrade, ropeGrade => ropeGrade.ropeSpecification)
    @JoinColumn({ name: 'ropeGradeId' })
    ropeGrade: RopeGrade

    @Column({ default: null })
    extruderId: number

    @ManyToOne(() => Extruder, extruder => extruder.ropeSpecification)
    @JoinColumn({ name: 'extruderId' })
    extruder: Extruder

    @Column({ default: null })
    die: string

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    stretchRatio: number
    
    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    elongation: number

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    gpd: number

    @Column({ default: null })
    denier: string

    @Column({ default: null })
    noOfTape: string

    @Column({ default: null })
    strandDenier: string

    @Column({ default: null })
    onlineTpm: string

    @Column({ default: null })
    noOfStrand: string

    @Column({ default: null })
    ropeMcNo: string

    @Column({ default: null })
    gear: string

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    twistFactor: number

    @Column({ default: null })
    layLength: string

    @Column({ default: null })
    wMtr: string

    @Column({ default: null })
    actualDia: string

    @Column({ default: null })
    strength: string

    @Column({ default: null })
    rackNo: string

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