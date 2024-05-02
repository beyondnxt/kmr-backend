import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'color' })
export class Color {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    colorName: string

    @Column()
    shortCode: string

    @Column()
    matchingColor: string

    @Column({ default: null })
    applicableFor: string

    @Column({ default: null })
    createdBy: number;

    @CreateDateColumn()
    createdOn: Date;

    @Column({ default: null })
    updatedBy: number;

    @UpdateDateColumn()
    updatedOn: Date;
}