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

    @Column({ type: 'simple-json', default: null })
    applicableFor: { [key: string]: any };

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