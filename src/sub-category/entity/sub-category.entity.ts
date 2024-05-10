import { ChildCategory } from "src/child-category/entity/child-category.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @Column({ default: null })
    createdBy: number;

    @CreateDateColumn()
    createdOn: Date;

    @Column({ default: null })
    updatedBy: number;

    @UpdateDateColumn()
    updatedOn: Date;
}