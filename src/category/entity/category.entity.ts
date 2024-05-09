import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'category' })
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    categoryName: string

    @Column()
    parentCategory: string

    @Column()
    categoryCode: string

    @Column()
    type: string

    @Column()
    grade: string

    @Column()
    smsCategory: boolean

    @Column({ default: null })
    createdBy: number;

    @CreateDateColumn()
    createdOn: Date;

    @Column({ default: null })
    updatedBy: number;

    @UpdateDateColumn()
    updatedOn: Date;
}