import { Category } from "src/master/category/entity/category.entity";
import { ChildCategory } from "src/master/child-category/entity/child-category.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'sub-category'})
export class SubCategory{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    childCategoryId: number

    @ManyToOne(()=>ChildCategory, childCategory=>childCategory.subCategory)
    @JoinColumn({name: 'childCategoryId'})
    childCategory: ChildCategory

    @Column()
    name: string

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

    @OneToMany(()=>Category, category=>category.subCategory)
    category: Category
}