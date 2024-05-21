import { ParentCategory } from "src/master/parent-category/entity/parent-category.entity";
import { SubCategory } from "src/master/sub-category/entity/sub-category.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'child-category'})
export class ChildCategory{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    parentCategoryId: number

    @ManyToOne(()=>ParentCategory, parentCategory=>parentCategory.childCategory)
    @JoinColumn({name: 'parentCategoryId'})
    parentCategory: ParentCategory

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

    @OneToOne(()=>SubCategory,subCategory=>subCategory.childCategory)
    subCategory: SubCategory
}