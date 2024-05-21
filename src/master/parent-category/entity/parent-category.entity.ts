import { ChildCategory } from "src/master/child-category/entity/child-category.entity";
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'parent-category'})
export class ParentCategory{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ default: null })
    createdBy: number;

    @CreateDateColumn()
    createdOn: Date;

    @Column({ default: null })
    updatedBy: number;

    @UpdateDateColumn()
    updatedOn: Date;

    @OneToOne(()=>ChildCategory,childCategory=>childCategory.parentCategory)
    childCategory: ChildCategory
}