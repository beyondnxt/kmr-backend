import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'rope-kg-lenght'})
export class RopeKgLenght{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    code: string

    @Column()
    meterKg: string

    @Column({ default: false})
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