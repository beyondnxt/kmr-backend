import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'twine-type' })
export class TwineType {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

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